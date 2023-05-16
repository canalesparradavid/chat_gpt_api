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

        // Almaceno la respuesta en el repositorio
        this.msgRepository.add(new MSG("assistant", response));

        return response;
    }
}

export default MSGController
