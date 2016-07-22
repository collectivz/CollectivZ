```
meteor npm install --save react react-dom react-router
meteor npm install --save react-addons-pure-render-mixin
meteor add react-meteor-data
```

## architecture
### proposition

Deux collections distinctes:

channels = {
  _id: String,
  type: null || 'guilde' || 'mission',
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
  type: null || 'sondage'
}
