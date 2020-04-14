const dialogFlow = require('dialogflow');
require('dotenv').config();

const sessionClient = new dialogFlow.SessionsClient();

const sessionPath = sessionClient.sessionPath(
  process.env.googleProjectId,
  process.env.sessionId,
  )

module.exports = {
  textQuery: async (text, parameters = {}) => {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text,
          languageCode: 'en-US',
        },
      },
      queryParams: {
        payload: {
          data: parameters
        }
      }
    }

    const responses = await sessionClient.detectIntent(request)
    return responses;
  }
}