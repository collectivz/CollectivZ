# Tests collectivZ


Deux types de tests composes tout projet informatique:

* les tests unitaires
* les tests fonctionnels / d'integrations


# Tests unitaires

On utilise l'outil Jest de React, et en particulier la fonctionnalité Snapshot de Jest.

Tous les tests doivent s'écrire de la facon suivante:

`<nom d'un composant React>.test.js`

Quand on lance npm test, l'outils npm recherchera l'ensemble des fichiers ayant pour suffixe .test.js afin
de les exécuter.

## Template de test

Un template de test a été crée. Ce fichier s'appelle `List.test.js`

L'écriture de ce test est très courte, ceci grace à la fonction snapshot de Jest.

Un snapshop génère une forme sérialisable de la fonction render du composant à tester.
Si cette forme sérialisable nous semble bonne, elle servira de référence pour les comparaisons ultérieurs des
nouvelle version du composant à tester.

Voir la doc Jest de React pour plus d'information


# Tests fonctionnels

L'outil pour créer et exécuter des tests fonctionnels s'appelle Gost Inspector.

L'outil est très simple a installer et à utiliser.


## Connection au compte Ghost Inspector

Un compte Ghost Inspector a été crée.

https://ghostinspector.com/

avec

login: nodev.collectivz@gmail.com
password: QSDfgh_123

Ce compte Gost Inspector a pour role :

* archiver les jeux de tests
* gérer les jeux de tests
* rejouer les jeux de tests
* vérifier le bon résultat des jeux de test

## Enregistrement d'un test

Il faut effectuer les étapes suivantes:

* installer l'extension Chrome Ghost Inpector (si pas déja fait)
* Aller sur htts://dashboard.heroku.com/apps/collectivzdev, puis cliquer sur
"More", situé en haut à droite, puis cliquer sur "Restart All Dynos". Cela
permet de réinitialiser la base à vide.
* lancer http://collectivzdev.herokuapp.com et se mettre sur la page de login
* cliquer sur l'icone Ghost Inspector situé en haut à droite du navigateur
* selectionner "Start Recording"
* se logger sur CollectivZ
* faire les actions souhaités
* reselectionner l'icone Ghost Inspector et "Make Assertion"
* relancer la procedure de recording
* ...
* defaire les actions que l'on a réalisées
* faire logout
* arreter la procedure de recording
* nommer le test réalisé dans la suite CollectivZ


## règles d'écritures d'un test

Pour que les tests soient reproductible:

* faire les actions inverses en fin de test afin de revenir à un état équivalent du début du test.

## Rejouer les tests

* aller sur https://ghostinspector.com/
* lancer les tests individuellement ou la suite de tests



