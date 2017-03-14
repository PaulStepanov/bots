module.exports=class LinkStore{

    static saveLink(session,link){
        session.userData.links = session.userData.links ? session.userData.links : [];
        session.userData.links.push(link);
    }

    static undoSaving(session) {
        if (!session.userData.links || session.userData.links==[]){
            session.send('You has no saved links, type \'save\' to start saving')
            return undefined
        }
        session.userData.links.pop()
        session.send('Your last link was deleted');
    }
};