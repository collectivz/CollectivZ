# Introduction

Ce document liste l’ensemble des comptes CollectivZ servant pour le developpement de CollectivZ


# Gmail

Un compte gmail CollectivZ a été crée. Ce compte est

nodev.collectivz@gmail.com

password: QSDfgh_123


# Github

## Compte CollectivZ

Il existe un compte CollectivZ Github. Ce compte est de type Organisation.

Un compte de type Organisation permet de partager ce compte avec plusieurs utilisateurs.
L'autre interet est de s'identifier avec son compte personnel, permettant ainsi la non proliferation de compte à gerer.

## Connection Github

On se connecte donc à ce compte CollectivZ par l'intermédiaire de son compte personnel Github.

Pour l’instant seul deux personnes ont acces à ce compte CollectivZ: Jacques Bonet, Philippe Decrat

Ces deux personnes ont les droits admin sur ce compte.


## Compte nodev.collectivz@gmail.com

Ce compte permet à des non développeurs d’avoir acces au repository CollectivZ (code, zube.io, ...)

le password d'acces est QSDfgh_123



# Zube.io

Zube.io est un outil de gestion de projet Scrum.

Un projet CollectivZ a été crée avec cet outil.

On se connecte à ce projet par l'intermediaire de son compte github.

3 comptes github ont acces au projet CollectivZ: le compte github de Jacques Bonet, de Philippe Decrat et
nodev.collectivz@gmail.com


# Travis

Travis est un outil d'integration continue.

Il permet lors de chaque commit, de généré automatiquement l'application CollectivZ, à la condition que l'ensemble des
tests unitaires soient passés sans erreur.

## Connection Travis

On se connecte à Travis avec son compte github.

Si votre compte github est connecté à un compte github de type Organisation, travis pourra acceder au compte organisation de github.

C'est exactement ce que l'on a pour le compte CollectivZ.

Un indicateur de statut travis du projet github CollectivZ a été mis sur sa page d'accueil.

## Configuration Travis

Le fichier de configuration travis du projet CollectivZ s'appel .travis.yml

Le contenu de ce fichier est très simple:

language: node_js
node_js:
  - "7.4"
env:
  - CXX=g++-4.8
addons:
  apt:
    sources:
      - ubuntu-toolchain-r-test
    packages:
      - g++-4.8
before_install:
  - "curl https://install.meteor.com | /bin/sh"
  - "export PATH=$HOME/.meteor:$PATH"
notifications:
  webhooks:
    urls:
      - https://api.ghostinspector.com/v1/suites/[suite-id]/execute/?apiKey=[api-key]
    on_success: always
    on_failure: never

Travis execute automatiquement un ensemble de target npm.
Travis prépare l'environnement Meteor afin de pouvoir executer des tests CollectivZ sous Travis.
Travis défini un hook vers ghostinspector por les tests fonctionnels.


# Heroku

Heroku est la plateform hebergeant les serveurs CollectivZ.

On a 5 serveurs CollectivZ.

collectivzdev : le serveur de développement, correspondant au dernier état de la version de développement
collectivz-test : le serveur de test, correspondant au dernier état de la version de développement

collectivz : le serveur d'integration. Le serveur d'integration permet de tester l'application CollectivZ
sur mobile (ios et android). L'application sur Apple Store et Playstore s'appelle Collectivz.
Sur le web, l'acces est collectivz.herokuapp.com.

collectivz-cfe : le server pour la cfe-cgc. L'application sur l'Apple Store et le Playstore s'appelle collectivz-union.
Sur le web, l'acces est collectivz-cfe.herokuapp.com.

collectivz-cjd: le serveur pour la cjd. Pas d'application mobile pour l'instant.

collectivzcz: autre serveur



## Connection Heroku

On se connecte sur Heroku avec l'url heroku.com

Comme pour github, on peut avoir des comptes organisations Heroku.

Le cout d'un serveur Organisation est de 7 euros.

Afin de diminuer les couts, on ne mettra que les serveurs de production en compte organisation. Pour l'instant seul le serveur collectivz-union
est un compte Organisation.

Pour les autres comptes, Jacques Bonet est admin et Philippe Decrat est collaborateur.
La difference entre un admin et un Collaboration, est que le Collaborateur ne peut pas changer les droits

Deux personnes ont pour l'instant acces à ce compte : Jacques Bonet, Philippe Decrat


## Lien Heroku - Github

Un lien Heroku vers le projet github CollectivZ a été crée.

## Deployement Heroku

Il y aura un deployement automatique vers le serveur collectivzdev et collectivz-test de Heroku, que si la génération du projet sous Travis est correcte

Le deployement vers les autres serveurs se fait de facon manuel en allant sur la pipeline CollectivZ d'Heroku et en exécutant
la fonction "Promote to ..."

Le serveur collectivz-test doit etre utilisé uniquement par l'outils de test fonctionnel


## Monitoring des serveurs de production Heroku

Pour l'instant aucun outils de monitoring n'a été installé sur les serveur de production Heroku.

Cela peut se faire très facilement en cliquant sur le menu setting d'un serveur Heroku.





