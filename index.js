
let builder = require('botbuilder');
let restify=require('restify');

//Setup server
let server=restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
let connector = new builder.ConsoleConnector().listen();
let bot = new builder.UniversalBot(connector);

//Configure bot intends and dialogs
let intents=require('./saveIntends');
bot.dialog('/', intents);

let dialog=require('./dialogs');
console.log(dialog.call(this,bot));
