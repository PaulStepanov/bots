let builder = require('botbuilder');

//=========================================================
// Bots Intends
//=========================================================
const intents = new builder.IntentDialog();
let address;
intents.matches(/^save/i,[
    function (session) {
        address=session.message.address;
        session.beginDialog('/saveDialog')
    }
]);

intents.matches(/^show/i,[
    function (session) {
        for (let  link of session.userData.data){
            session.send(link);
        }
    }
]);
intents.onDefault([
    function (session, args, next) {
        session.send('hi')
    }
]);

module.exports=intents;