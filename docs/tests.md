# Tests collectivZ


Deux types de tests composes tout projet informatique: les tests unitaire et les tests fonctionnels / d'integrations


# test unitaire

## Test unitaire React

On utilise l'outil Jest de React, et en particulier la fonctionnalité Snapshot de Jest.

Tous les tests doivent s'écrire de la facon suivante:

<nom d'un composant React>.test.js

Quand on lance npm test, l'outils npm recherchera l'ensemble des fichiers ayant pour suffixe .test.js afin
de les exécuter.

# Template de test

Un template de test a été crée. Ce fichier s'appelle List.test.js

L'écriture de ce test est très courte, ceci grace à la fonction snapshot de Jest.

Un snapshop génère une forme sérialisable de la fonction render du composant à tester.
Si cette forme sérialisable nous semble bonne, elle servira de référence pour les comparaisons ultérieurs des
nouvelle version du composant à tester.

Voir la donc Jest de React pour plus d'information


# Test fonctionnel

L'outil pour réaliser des tests fonctionnels s'appelle Gost Inspector.

L'outil est très simple d'utilisation.

1) Il faut installer le plugin Gost Inspector sur Chrome.

2) Il faut lancer le serveur collectivzdev.herokuapp.com


