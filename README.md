```
meteor npm install --save react react-dom react-router
meteor npm install --save react-addons-pure-render-mixin
meteor add react-meteor-data accounts-password
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
  title: String,
  type: String,
  objectId: null || String,
  sourceId: null || String,
  author: String,
  depth: Number                      //indique a quel niveau de profondeur se
  privilegedMembers: [String],       //situe le chan
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
  depth: Number,   //indique son niveau de profondeur de chan imbriqué
  author: String,
  xp: Number,
  level: Number,
  wallet: Number,
  interest: [String],
  privilegedMembers: [String],
  gradeAvailable: [String],
  adhesionRequest: [String],
  chanConnected: String,
  connections: Object : {
    membersCount: Number,   //optional
    }
  }

polls = {
  finished: Boolean,
  messageFatherId: String,
  chanId: String,
  }

props = {
  name: String,
  voteRecevedFrom: [String],
  pollId: String,
  }

args = {
  text: String,
  author: String,
  voteRecevedFrom: [String],
  timestamp: Date(),
  propsId: String,
}


}
```
