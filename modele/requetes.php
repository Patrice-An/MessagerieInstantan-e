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


function get10DernierMessages($groupe){
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
    
    $request = $bd->getPdo()->prepare("Select * From Appartenir where IdUser = :id;");
    $request->bindParam(':id', $groupe);
  

    $request->execute();
    $result = $request->fetchAll(PDO::FETCH_ASSOC);

    return $result;
}

function Creergroupe(){


    return null;
}

function isInGroup($idUser, $idGroupe){
    $bd = new Connexion();
    $bd = $bd->getConnexion();
    
    $request = $bd->getPdo()->prepare("Select COUNT(*) From Appartenir where IdUser = :id AND idGroupe = :groupe;");
    $request->bindParam(':id', $idUser);
    $request->bindParam(':groupe', $idGroupe);

    $request->execute();
    $result = $request->fetchAll(PDO::FETCH_ASSOC);

    return $result;
}

function UserExistant($mail, $mdp){
    $bd = Connexion->getConnexion();
    
    $request = $bd->getPdo()->prepare("Select * From Utilisateur where MAIL = :name and Password = :mdp;");
    $request->bindParam(':mail', $mail);
    $request->bindParam(':mdp', $mdp);

    $request->execute();
    $result = $request->fetchAll(PDO::FETCH_ASSOC);

    return $result;
}
?>