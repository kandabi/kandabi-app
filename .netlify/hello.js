const https = require('https');


exports.handler = function(event, context, callback) {
    https.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyDxWeygwBYan8igZjGE2F9MB0pcfDSw9yM&callback=initMap&libraries=&v=weekly', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        //console.log(.explanation);
        callback(null, {
            statusCode: 200,
            body: JSON.parse(data)
        });
    });

    }).on("error", (err) => {
        callback(null, {
            statusCode: 500,
            body: JSON.parse(err.message)
        });
      
    });
}