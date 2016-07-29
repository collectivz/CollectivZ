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
  subscribedGuilds: [String id],     // idem.
  connections: Object : {
    guildsCount: Number,   //optional
    chanCount: Number,
  }  
}

channels = {
  _id: String,
  name: String,
  type: String,
  parentId: null || String,
  author: String,
  leaders: [String],
  members: [String],
  depth: Number                      //indique a quel niveau de profondeur se
  privilegedMembers: [String],       //situe le chan
  adhesionRequest: [String],
  connections: Object : {
    chanCount: Number
  }
}

messages = {
  _id: String,
  text: String,
  type: null || 'sondage',
  chanId: String,
  createdAt: Date(),
  author: String,

}

guilds = {
  _id: String,
  name: String,
  depth: Number,   //indique son niveau de profondeur de chan imbriqué
  author: String,
  mainChannel: String,
  connections: Object : {
    memberCount: Number,   //optional
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
