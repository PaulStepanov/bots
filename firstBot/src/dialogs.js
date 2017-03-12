//=========================================================
// Bots Dialogs
//=========================================================
let builder = require('botbuilder');

module.exports = function addDialogs(bot) {
    let intend = new builder.IntentDialog();
    intend.matches(/^stop/i, [function (session) {
        session.endDialog();
    }]);

//=========================================================
//    Save user input
//=========================================================
    bot.dialog('/saveDialog', [
        function (session) {
            builder.Prompts.text(session, `Give me a link or whatever, i'll save`)
        },
        function (session, result) {
            // session.userData.address = address;//TODO make a veryfiing function

            if (/^stop/i.test(result.response)){
                session.endDialog();
            } else {
                session.userData.links = session.userData.links ? session.userData.links : []
                session.userData.links.push(result.response);
                console.log(session.userData.links);
                session.beginDialog('/saveDialog');
            }

        }
    ]);

//=========================================================
//    Init user
//=========================================================
// bot.dialog('/init', [
//     (session)=>{
//         session.userData.links=session.userData.links?session.userData.links:[]
//         session.endDialog();
//     }
// ])

};