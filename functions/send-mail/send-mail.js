// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
    var response = {
      statusCode: 200,
      body: "Empty"
    };

    try {
      response.body = 'try';

      const options = {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS,
        to: 'kandabiaviv@gmail.com',
      };

      response.body = 'options';
      const send = require('gmail-send')(options);
      response.body = 'require';

      send({ 
        subject: 'subject' ,
        text: 'test test', 
      }, 
        (error, result, fullResult) => {
          if (error) {
            response.statusCode = 500;
            response.body = error.toString() ;
          }
          else {
            response.body = result;
          }
      });

      response.body = 'send';
    }
    catch (error) {
        response.statusCode = 500;
        response.body = error.toString() ;
    }

    return response;
}





