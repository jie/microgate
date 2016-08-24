import http from 'http';
import os from 'os';
import child_process from 'child_process';
import net from 'net'


export class ServerMaster {
    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.workers = [];
        this.numCPUs = os.cpus().length;
        console.log('cpus: ', this.numCPUs)
    }

    startWorkers() {
        for (let i = 0; i < this.numCPUs; i++) {
            let pc = child_process.fork('./src/server/woker.js', ['normal']);
            pc.on('close', function(code) {
                console.log(code)
            })
            this.workers.push(pc);
        }
    }

    startUp() {
        this.startWorkers();
        let self = this;
        net.createServer(function(socket) {
            socket.pause();
            let worker = self.workers.shift();
            // console.log('woker: ', worker)
            worker.send('c', socket);
            self.workers.push(worker);
        }).listen(this.port, this.host);
    }
}
