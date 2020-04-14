const dialogFlow = require('dialogflow');
require('dotenv').config();


const sessionClient = new dialogFlow.SessionsClient();

const sessionPath = sessionClient.sessionPath(
  process.env.googleProjectId,
  process.env.sessionId,
  )


const route = (app) => {
  app.get('/', (req, res) => {
    res.send('hello world')
  })

  app.post('/api/df_text_query', (req, res) => {
console.log('ppp')
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: req.body.text,
          // The language used by the client (en-US)
          languageCode: 'en-US',
        },
      },
    }

    sessionClient.detectIntent(request)
    .then(responses => {
      console.log('Detected intent');
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }
    }).catch(err => console.log('ERROR', err))


    res.send(result);
  });


  app.get('/api/df_event_query', (req, res) => {
    res.send({'do': 'event query'});
  });
}

module.exports = route;