import MSGController from "./MSGController.js"
import MSG from "./MSG.js"

var assistantName = "Asistente";

var chatLog = $("#chat_log");
var chatInput = $("#chat_input");

var msgController = new MSGController();

var lastKey = 0;

function addToLog(msg) {
    // var msgText = msg.msg.replaceAll("\n", "<br>");
    var msgText = msg.msg;

    //Creo un convertidor de Markdown a HTML
    var converter = new showdown.Converter();
    msgText = converter.makeHtml(msgText);

    var newEntry = "<span class='msg msg_sender'>" + msg.role + ":<span class='msg msg_content'><p>" + msgText +"</p></span></span>";
    chatLog.html(chatLog.html() + newEntry);
}

// Creo eventos sobre el DOM
chatInput.on('keydown', function() {
    // Mando al MSGController el mensaje escrito en el input
    if (event.which == 13 && lastKey == 17) {    // Si se pulsa CTRL + ENTER
        // Almaceno el mensaje y borro el input
        var msg = new MSG('Tu', chatInput.html());
        chatInput.html('');

        // Añado el mensaje al log
        addToLog(msg);

        // Envio el mensaje
        var response = msgController.send(msg);

        //  Añado la respuesta al log
        var responseMsg = new MSG(assistantName, response);
        addToLog(responseMsg);
    }

    // Almaceno la ultima tecla presionada
    lastKey = event.which;
});
