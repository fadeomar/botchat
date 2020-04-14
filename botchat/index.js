const dialogFlow = require('dialogflow');
const structjson = require('./structjson.js');

require('dotenv').config();

const credentials = {
  client_email: process.env.client_email,
  private_key: process.env.private_key
}

const sessionClient = new dialogFlow.SessionsClient({projectID: process.env.googleProjectId, credentials});

const sessionPath = sessionClient.sessionPath(
  process.env.googleProjectId,
  process.env.sessionId,
  )

module.exports = {
  textQuery: async (text, parameters = {}) => {
    let self = module.exports;
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

    let responses = await sessionClient.detectIntent(request)
    responses = self.handleAction(responses)
    return responses;
  },
  eventQuery: async (event, parameters = {}) => {
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          languageCode: 'en-US',
        },
      }
    }

    let responses = await sessionClient.detectIntent(request)
    responses = self.handleAction(responses)
    return responses;
  },
  handleAction: responses => {
    return responses;
  }
}