//=========================================================
// Bots Dialogs
//=========================================================
let builder = require('botbuilder');
let SaveLinksStore = require('./savedLinksStore');
let helpMenu=require('./helpMenu');

module.exports = function addDialogs(bot) {
    let intend = new builder.IntentDialog();
    intend.matches(/^stop/i, [function (session) {
        session.endDialog();
    }]);

//=========================================================
//    Save user input
//=========================================================
    //Todo make it with intends
    bot.dialog('/saveDialog', [
        function (session) {
            builder.Prompts.text(session, `Give me a link or whatever, i'll save`)
        },
        function (session, result) {
            // session.userData.address = address;//TODO make a veryfiing function

            if (/^stop/i.test(result.response)) {
                session.endDialog();
            } else {
                if (/^undo/i.test(result.response)) {
                    SaveLinksStore.undoSaving(session);
                    session.beginDialog('/saveDialog');
                } else {
                    if (/^show/i.test(result.response)) {
                        session.beginDialog('/showLinks');
                        session.beginDialog('/saveDialog');
                    } else {
                        if (/^help/i.test(result.response)) {
                            helpMenu(session);
                            session.beginDialog('/saveDialog');
                        } else {
                            SaveLinksStore.saveLink(session, result.response);
                            session.beginDialog('/saveDialog');
                        }
                    }
                }
            }

        }
    ]);

    bot.dialog('/showLinks', [
        session => {
            if (session.userData.links && session.userData.links!=[]) {
                for (let link of session.userData.links) {
                    session.send(link);
                }
            } else {
                session.send('You has no saved links, type \'save\' to start saving')
            }

            session.endDialog();
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