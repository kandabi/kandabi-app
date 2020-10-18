// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const options = {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS,
    to: 'kandabiaviv@gmail.com',
};

const send = require('gmail-send')(options);

exports.handler = async event => {
    var response;
    send({ 
      subject: 'subject' ,
      text: 'test test', 
    }, 
      (error, result, fullResult) => {
        if (error) {
          return {
            statusCode: 500,
            body: error,
          }
        }
        else {
         return {
            statusCode: 200,
            body: result,
          }
        }
    });
    
    return response;
}





