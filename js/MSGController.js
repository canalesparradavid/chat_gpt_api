import MSG from "./MSG.js"
import ChatGPTDataSource from "./ChatGPTDataSource.js"
import MSGRepository from "./MSGRepository.js"

class MSGController {
    constructor() {
        this.chatGPTDataSource = new ChatGPTDataSource();
        this.msgRepository = new MSGRepository();
    }

    send(msg) {
        // Almaceno el mensaje en el repositorio
        msg.role = 'user';
        this.msgRepository.add(msg);

        // Hago la peticion a la API de ChatGPT
        var msgs = this.msgRepository.getAll();
        var response = this.chatGPTDataSource.chat(msgs);
        var msg_text = response[0];
        var status_code = response[1];

        // Almaceno la respuesta en el repositorio
        if (status_code == 200) {
            this.msgRepository.add(new MSG("assistant", msg_text));
        }

        return msg_text;
    }
}

export default MSGController
