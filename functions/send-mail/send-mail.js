// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method





exports.handler = async event => {
    try 
    {
      var response;
      const options = {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASS,
          to: 'kandabiaviv@gmail.com',
      };
      
      const send = require('gmail-send')(options);

      send({ 
        subject: 'subject' ,
        text: 'test test', 
      }, 
        (error, result, fullResult) => {
          if (error) {
            response = {
              statusCode: 500,
              body: error,
            }
          }
          else {
            response = {
              statusCode: 200,
              body: result,
            }
          }
      });
    }
    catch (error) {
         response = { 
          statusCode: 500, 
          body: error.toString() 
        }
    }

    return response;
}





