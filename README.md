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
  }  
}

channels = {
  _id: String,
  type: Number depth || 'guilde' || 'user',
  sourceId: null || String,
  sourcePreview: null || Object: {
    author: String,
    content: String,
    avatarURI: String,
  }
  privilegedMembers: [String],
  adhesionRequest: [String],
  connections: Object : {
    membersCount: Number,   //optional
    missionsCount: Number,  //optional  
    pollsCount: Number,     //optional
    guildesCount: Number,   //optional
    challengeCount: Number, //optional
    walletCount: Number,    //optional
  }
}

messages = {
  _id: String,
  type: null || 'sondage',
  channelId: String,

}
```
