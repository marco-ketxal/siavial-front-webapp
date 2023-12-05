import styled from "styled-components";
import { IconButton, Icon, Button } from "@mui/material";
const getColor = (props) => {
    if (props.isDragAccept) {
        return "#00e676";
    }
    if (props.isDragReject) {
        return "#ff1744";
    }
    if (props.isDragActive) {
        return "#2196f3";
    }
    return "#eeeeee";
};

const getButtonColor = (props) => {
    switch (props.status) {
        case "error":
            return "#F44336";
        case "success":
            return "#26EEBE";
        case "default":
            return "#ff475e";
        default:
            return "#ff475e";
    }
}

const CloseButton = styled(IconButton)`
    background-color: #f2f2f2;
    color: #ffb8c1;
    width: 30px;
    height: 30px;
`;

const CloseIcon = styled(Icon)`
    font-size: 1rem;
`;

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${(props) => getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
    min-height: 10rem;
`;

const RoundedButton = styled(Button)`
    border-radius: 24px;
`;

const StatusButton = styled(Button)`
    border-radius: 24px;
    background-color: ${(props) => getButtonColor(props)};
`;

const ThumbContainer = styled.div`
    display: inline-flex;
    border-radius: 2px;
    border: 1px solid #eaeaea;
    margin-bottom: 8px;
    margin-right: 8px;
    width: 100px;
    height: 100px;
    padding: 4px;
    box-sizing: border-box;
    margin-top: 1rem;
    position: relative;
`;

const ThumbInner = styled.div`
    display: flex;
    min-width: 0;
    overflow: hidden;
`;

const Thumb = styled.img`
    display: block;
    width: auto;
    height: 100%;
`;

const DeleteButton = styled(IconButton)`
    position: absolute;
    background-color: #4b4b4b;
    color: white;
    right: -10px;
    top: -10px;
    :hover {
        background-color: #4b4b4b;
        color: white;
    }
`;

const DeleteIcon = styled(Icon)`
    font-size: 1rem;
`;

export {
    CloseButton,
    CloseIcon,
    Container,
    RoundedButton,
    ThumbContainer,
    ThumbInner,
    Thumb,
    DeleteButton,
    DeleteIcon,
    StatusButton
};
