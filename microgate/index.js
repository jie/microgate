import {
    ServerMaster
}
from './server/master'
let server = new ServerMaster('0.0.0.0', 8000);
server.startUp();
