import io from "socket.io-client";
import globalConfig from "react-global-configuration";

function listenerSocket(fnResponse, socketInstance, fnOnConnect) {
    socketInstance.on("connect", () => {
        if (fnOnConnect) {
            fnOnConnect();
        }
        console.log("Backend is connected");
    });
    socketInstance.on("disconnect", () => {
        console.log("Backend is disconnected");
    });
    socketInstance.on("connect_error", () => {
        console.log("Backend connection has not been established");
    });
    socketInstance.on("reconnecting", () => {
        console.log("Backend reconnecting...");
    });
    socketInstance.on("response", async (data) => fnResponse(data));
}

export function connectSocket(idSocket, fnResponse, fnOnConnect) {
    let obj = io(`${globalConfig.get("urlSocket")}`, {
        query: `user=${idSocket}`,
    });
    listenerSocket(fnResponse, obj, fnOnConnect);
    return obj;
}

export function closeSocket(socketInstance) {
    try {
        socketInstance.close();
    } catch (error) {
        /**Don't worry */
    }
}
