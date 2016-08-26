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
            let cp = child_process.fork('./microgate/server/worker.js', [
                'normal'
            ]);
            cp.on('close', function(code) {
                console.log(code)
            })
            this.workers.push(cp);
        }
    }

    startUp() {
        this.startWorkers();
        let self = this;
        net.createServer(function(socket) {
            socket.pause();
            let worker = self.workers.shift();
            worker.send('c', socket, [{
                track: false,
                process: false
            }]);
            self.workers.push(worker);
        }).listen(this.port, this.host);
    }
}
