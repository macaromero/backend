const express = require("express");


class Server {
     app;
     port = process.env.SERVER_PORT;
     host = process.env.SERVER_HOST;

    constructor(){
        this.app = express();
    }

    start(callback){
        this.app.listen(this.port, this.host, callback);
    }
}

module.exports = Server;