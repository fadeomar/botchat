const dialogFlow = require('dialogflow');
require('dotenv').config();
const botchat = require('../botchat')


const sessionClient = new dialogFlow.SessionsClient();

const sessionPath = sessionClient.sessionPath(
  process.env.googleProjectId,
  process.env.sessionId,
  )


const route = (app) => {
  app.get('/', (req, res) => {
    res.send('hello world')
  })

  app.post('/api/df_text_query', async (req, res) => {
    const responses = await botchat.textQuery(req.body.text, req.body.parameters)
    res.send(responses[0].queryResult);
  });


  app.post('/api/df_event_query', async (req, res) => {
    const responses = await botchat.eventQuery(req.body.event, req.body.parameters)
    res.send(responses[0].queryResult);
  });
}

module.exports = route;