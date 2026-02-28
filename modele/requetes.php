<?php
include 'connexion_sql.php';

function getAllMessages($groupe){
    $bd = new Connexion();
    $bd = $bd->getConnexion();
    
    $request = $bd->getPdo()->prepare("Select * From Message where IdGroupe = :id ORDER BY DateMessage ASC;");
    $request->bindParam(':id', $groupe);

    $request->execute();
    $result = $request->fetchAll(PDO::FETCH_ASSOC);

    return $result;
}


function get10DernierMessages(){
    $bd = new Connexion();
    $bd = $bd->getConnexion();
    
    $request = $bd->getPdo()->prepare("Select * From Message where IdGroupe = :id ORDER ORDER BY DateMessage DESC LIMIT 10;");
    $request->bindParam(':id', $groupe);

    $request->execute();
    $result = $request->fetchAll(PDO::FETCH_ASSOC);

    return $result;
}



function getAllGroupe($idUser){
    $bd = new Connexion();
    $bd = $bd->getConnexion();
    
    $request = $bd->getPdo()->prepare("Select * From Appartenir,  where IdUser = :id;");
    $request->bindParam(':id', $groupe);

    $request->execute();
    $result = $request->fetchAll(PDO::FETCH_ASSOC);

    return $result;
}

function Creergroupe(){


    return null;
}

function isInGroup($idUser, $idGRoupe){
   
}

function UserExistant($idUser, $mdp){

}
?>