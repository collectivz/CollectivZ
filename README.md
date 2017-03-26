

## Travis status

[![Build Status](https://api.travis-ci.org/collectivz/CollectivZ.svg?branch=master)](https://travis-ci.org/collectivz/CollectivZ)


## install meteor

curl https://install.meteor.com | /bin/sh


## install jest (for test)

npm install -g jest


## install

npm install


## start
npm install
npm start

## architecture
### proposition

```.
user = {
  _id,
  suscribedChannels: [String id],     // moins de channels par utilisateur que
                                      // d'utilisateurs par channel => plus
                                      // faible complexité pour la recherche
                                      // et l'écriture ?
  subscribedChannels: [String]
  connections: Object : {
    channelCount: Number,
  }  
}

channels = {
  _id: String,
  name: String,
  type: String,
  parentId: null || String,
  rootId: String,
  author: String,
  leaders: [String],
  members: [String],
  depth: Number
  connections: Object : {
    channelCount: Number
  }
}

messages = {
  _id: String,
  text: String,
  type: null || 'sondage',
  chanId: String,
  createdAt: Date(),
  author: String,
  authorName: String,

}

polls = {
  author: String,
  authorName: String,
  finished: Boolean,
  messageFatherId: String,
  chanId: String,
  }

props = {
  name: String,
  voteReceivedFrom: [String],
  pollId: String,
  }

args = {
  text: String,
  author: String,
  voteReceivedFrom: [String],
  timestamp: Date(),
  propsId: String,
}


}
```


HIERARCHIE DU CSS
=================

- helper
-- const
-- normalize
-- tool
- atom
- molecule
- template


HELPERS
=======

Classes ou variables abstraites là pour aider à une mise en place propre de la suite


ATOMES
======

Les atomes sont les éléments indivisibles de l'interface et sont donc souvent des balises html uniques ( input, textarea, link, etc.. )


MOLECULES
=========

Les molécules sont des assemblages d'atomes qui forment un bloc ( typiquement un fieldset est composé d'un input, d'un label et éventuellement d'une icone )

Pour une meilleure compréhension générale, vous retrouverez le markup associé à chaque molécule en commentaire dans chaque fichier de molécule


TEMPLATE
========

Les templates enfin sont des assemblements de molécules qui requierent parfois quelques petits fixes ( si le boulot est bien fait, pas plus de quelques lignes )


TYPO ET COULEURS
================

L'essentiel de la logique est placé dans les fichiers _color.scss et _base.scss qui sont respectivement le fichier contenant toutes les variables de couleur du projet et le fichier contenant toute la logique typographique ( icones inclues )


MEDIA QUERIES
=============

Pour toute spécificité liée au responsive, un helper est prévu à cet effet. Il prends cette forme là

@include desktop {
  p {color: blue}
}

Pour une maintenance plus aisée du code, toujours ajouter ce helper à même le fichier du composant que l'on travaille ( en dessous )


ICONES
======

Si vous chercher une icone en particulier, le dossier public/img/icons est à votre disposition. Il contient la totalité des icones présentes en svg. Le nom du fichier corresponds au nom de la classe à utiliser pour l'appeler depuis le css.
