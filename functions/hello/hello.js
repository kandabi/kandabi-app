// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async event => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: process.env.CONTACT_EMAIL }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
