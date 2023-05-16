class MSGRepository {
    constructor() {
        this.msgs = [];
    }

    add(msg) {
        this.msgs.push({
            "role": msg.role,
            "content": msg.msg
        });
    }

    getAll() {
        // return JSON.stringify(this.msgs);
        return this.msgs;
    }
}

export default MSGRepository
