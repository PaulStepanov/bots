import {addDialogs} from 'dialogs'
import {intents} from 'intends'
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

bot.dialog('/', intents);

//=========================================================
// Bots Dialogs
//=========================================================

console.log(dialog);
