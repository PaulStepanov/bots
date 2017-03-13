module.exports=session=>{
    session.send('There is my commands:');
    session.send("'save' starting saving everything that you type");
    session.send("'stop' stop saving ");
    session.send("'undo' removes last saved line ");
    session.send("'show' show your saved tasks ");
    session.send("type 'help' if you need to see a list of commands ");
};