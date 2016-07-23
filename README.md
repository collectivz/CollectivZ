```
meteor npm install --save react react-dom react-router
meteor npm install --save react-addons-pure-render-mixin
meteor add react-meteor-data
```

## architecture
### proposition

```
user = {
  _id,
  suscribedChannels: [String id],     // moins de channels par utilisateur que
                                      // d'utilisateurs par channel => plus
                                      // faible complexité pour la recherche
                                      // et l'écriture ?
  subscribedGuildes: [String id],     // idem.
  connections: Object : {
    membersCount: Number,   //optional
    missionsCount: Number,  //optional  
    pollsCount: Number,     //optional
    guildesCount: Number,   //optional
    challengeCount: Number, //optional
    walletCount: Number,    //optional
    chanCount: Number,
  }  
}

chans = {
  _id: String,
  type: Number depth || 'user' || 'chan',
  sourceId: null || String,
  author: String,
  privilegedMembers: [String],
  adhesionRequest: [String],
  connections: Object : {
    membersCount: Number,   //optional
    missionsCount: Number,  //optional  
    pollsCount: Number,     //optional
    challengeCount: Number, //optional
    walletCount: Number,    //optional
    chanCount: Number
  }
}

msgs = {
  _id: String,
  text: String,
  type: null || 'sondage',
  chanId: String,
  timestamp: Date(),
  userId: String,

}

guilds = {
  _id: String,
  name: String,
  depth: Number,
  author: String,
  xp: Number,
  level: Number,
  interest: [String],
  privilegedMembers: [String],
  gradeAvailable: [String],
  adhesionRequest: [String],
  connections: Object : {
    membersCount: Number,   //optional
    missionsCount: Number,  //optional  
    pollsCount: Number,     //optional
    challengeCount: Number, //optional
    walletCount: Number,    //optional
    chanCount: Number,
  }
}
```
