const publicKey = "key_Ls23rozDzh7UAsQWkkd28Cg";
let tokenCard="";

const tokenizerCard = (dataCard)=>{
	window.Conekta.setPublicKey(publicKey);
	window.Conekta.Token.create(dataCard, successHandler, errorHandler);
}

var successHandler = function(token) {
	/* token keys: id, livemode, used, object */
	tokenCard=token.id
};

var errorHandler = function(err) {
	/* err keys: object, type, message, message_to_purchaser, param, code */
	console.log(err);
};



export { tokenizerCard  , tokenCard };