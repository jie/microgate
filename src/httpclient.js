import http from 'http';

export class HttpClient {

    constructor(options) {
        this.options = options
    }

    fetch(timeout, callback, errCallback) {
        let req = http.request(this.options, function(response) {
            response.on('data', function(chunk) {
                callback(response, chunk);
            });
        });

        req.setTimeout(timeout * 1000, function() {
            errCallback('request timeout')
        })

        req.on('error', function(e) {
            errCallback(e.message)
        });

        req.end();
    }
}
