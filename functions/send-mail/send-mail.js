// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
    var response = {
      statusCode: 200,
      body: "Empty"
    };

    try {
      const options = {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS,
        to: 'kandabiaviv@gmail.com',
      };

      const send = require('gmail-send')(options);

      const { result, full } = await send({ 
          subject: 'subject' ,
          text: 'message body', 
      });

      response.body = result;
    }
    catch (error) {
        response.statusCode = 500;
        response.body = error.toString() ;
    }

    return response;
}





