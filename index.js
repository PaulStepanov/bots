let builder = require('botbuilder');
let restify=require('restify');

//Setup server
let server=restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
let connector;
// connector = new builder.ChatConnector({
//     appId: 'c9d75f98-7c60-47b7-b7e0-52a785819aeb',
//     appPassword: 'Pfjhd6RnP7A00OzN0W2QeVB'
// });
connector = new builder.ConsoleConnector().listen();
let bot = new builder.UniversalBot(connector);
// server.post('/api/messages', connector.listen());

//Configure bot intends and dialogs
let intents=require('./src/mainIntends');
bot.dialog('/', intents);

let dialog=require('./src/dialogs');
console.log(dialog.call(this,bot));
