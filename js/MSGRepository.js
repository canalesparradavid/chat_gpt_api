const MAX_MSGS = 10;
const MAX_TOKENS = 2800;

class MSGRepository {
    constructor() {
        this.tokens = 0;
        this.msgs = [];
    }

    add(msg) {
        this.tokens += msg.msg.length;
        this.msgs.push({
            "role": msg.role,
            "content": msg.msg
        });

        // Si se sobrepasa el maximo de mensajes elimino el primero
        if (this.msgs.length == MAX_MSGS + 1) {
            this.tokens -= this.msgs[1].length;
            this.msgs.splice(1,1);
        }

        // Si se sobrepasa el maximo de tokens almacenables elimino mensajes
        while (this.tokens > MAX_TOKENS) {
            this.tokens -= this.msgs[1].length;
            this.msgs.splice(1,1);
        }
    }

    getAll() {
        // return JSON.stringify(this.msgs);
        return this.msgs;
    }
}

export default MSGRepository
