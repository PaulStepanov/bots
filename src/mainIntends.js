let builder = require('botbuilder');
let helpMenu=require('./helpMenu');

//=========================================================
// Bots Intends
//=========================================================
const intents = new builder.IntentDialog();
let address;


intents.matches(/^save/i, [
    function (session) {
        session.beginDialog('/saveDialog')
    }
]);

intents.matches(/^show/i, [
    function (session) {
        session.beginDialog('/showLinks')
    }
]);
intents.matches(/^help/i, [
    function (session) {
        helpMenu(session)
    }
]);
intents.onBegin(session=>{
    session.send("Hi i'm a link saver bot");
    helpMenu(session)
})
intents.onDefault([
    function (session, args, next) {
        session.send("unsporting command, type 'help' to see a list of commands")
    }
]);

module.exports = intents;