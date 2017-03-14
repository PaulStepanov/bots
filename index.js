let builder = require('botbuilder');
let restify = require('restify');

let connector;
if (process.env.NODE_ENV == 'production') {
    //Setup server
    let server = restify.createServer();
    server.listen(process.env.port || process.env.PORT || 3978, function () {
        console.log('%s listening to %s', server.name, server.url);
    });
    // Create chat bot
    connector = new builder.ChatConnector({
        appId: process.env.MICROSOFT_APP_ID,
        appPassword: process.env.MICROSOFT_APP_PASSWORD
    });
    server.post('/api/messages', connector.listen());
} else {
    console.log('started console connector')
    //If not production use console connector
    let connector = new builder.ConsoleConnector().listen()
}

let bot = new builder.UniversalBot(connector);

//Bootstrap app
let intents = require('./src/mainIntends');
bot.dialog('/', intents);

let dialog = require('./src/dialogs');
dialog.call(this, bot);
