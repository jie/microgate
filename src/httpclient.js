import http from 'http';

export class HttpClient {
    constructor(options) {
        this.options = options
        console.log('constructor')
    }

    fetch(callback) {
        let req = http.request(this.options, function(response) {
            response.on('data', function(chunk) {
                callback(chunk);
            });
        });

        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });

        req.end();
    }

}
