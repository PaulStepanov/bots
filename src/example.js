let builder = require('botbuilder');
let restify=require('restify');
let intents = new builder.IntentDialog();

//Setup server
// let server=restify.createServer();
// server.listen(process.env.port || process.env.PORT || 3978, function () {
//     console.log('%s listening to %s', server.name, server.url);
// });

// Create chat bot
let connector = new builder.ConsoleConnector().listen();
let bot = new builder.UniversalBot(connector);

bot.dialog('/', intents);
let adress;

//=========================================================
// Bots Dialogs
//=========================================================

intents.matches(/^change name/i, [
    function (session) {
        adress=session.message.address;
        session.beginDialog('/profile');
    },
    function (session, results) {
        let message=new builder.Message()
            .address(adress)
            .text('Ok... Changed your name to %s', session.userData.name)
        bot.send(message)
    }
]);

intents.onDefault([
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            next();
        }
    },
    function (session, results) {
        session.send('Hello %s!', session.userData.name);
    }
]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);
