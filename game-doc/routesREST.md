## Routes REST

**POST**/v1/public/player : RequestBody JSON format => code OK / code INVALID_INPUT / code CONFLICT
**_ surement inutile :_**
**GET** /v1/public/player/{id_player} => JSON instance of the class PLAYER ; code OK / code NOT_FOUND

**_ Afin de récupérer la grille courante :_**
**GET** /v1/public/grid/{id_grid} => JSON instance of the class GRID ; code OK / code NOT_FOUND

**POST** /v1/public/scores : RequestBody JSON format {id_grid,id_player;score} => code OK / code INVALID_INPUT / code CONFLICT
**_ Afin de récupérer tous les scores associés à la grille pour ensuite faire le trie localement et afficher les 5 meilleurs joueurs _**
**GET** /v1/public/scores/{id_grid} => JSON instance of the class CLASSEMENT; code OK / code NOT_FOUND
**_ Afin de mettre à jour le score du joueur pour la grille courante et écraser la valeur précédente : _**
**PUT** /v1/public/scores : RequestBody JSON format {id_grid,id_player;score} =>  code OK / code INVALID_INPUT / code CONFLICT