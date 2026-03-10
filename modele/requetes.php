<?php
include 'connexion_sql.php';

function getAllMessages($groupe){
    $bd = Connexion::getConnexion();
    
    $request = $bd->getPdo()->prepare("Select * From Message where IdGroupe = :id ORDER BY DateMessage ASC;");
    $request->bindParam(':id', $groupe);

    $request->execute();
    $result = $request->fetchAll(PDO::FETCH_ASSOC);

    return $result;
}


function get10DernierMessages($groupe){
    $bd = Connexion::getConnexion();
    
    $request = $bd->getPdo()->prepare("Select * From Message where IdGroupe = :id ORDER BY DateMessage DESC LIMIT 10;");
    $request->bindParam(':id', $groupe);

    $request->execute();
    $result = $request->fetchAll(PDO::FETCH_ASSOC);

    return $result;
}

 

function getAllGroupe($idUser){
    $bd = Connexion::getConnexion();
    
    $request = $bd->getPdo()->prepare("Select * From Appartenir where IdUser = :id;");
    $request->bindParam(':id', $idUser);
  

    $request->execute();
    $result = $request->fetchAll(PDO::FETCH_ASSOC);

    return $result;
}

function Creergroupe(){


    return null;
}

function isInGroup($idUser, $idGroupe){
    $bd = Connexion::getConnexion();
    
    $request = $bd->getPdo()->prepare("Select COUNT(*) From Appartenir where IdUser = :id AND idGroupe = :groupe;");
    $request->bindParam(':id', $idUser);
    $request->bindParam(':groupe', $idGroupe);

    $request->execute();
    $result = $request->fetchColumn(0 );

    return $result;
}

function UserExistant($mail, $mdp){
    $bd = Connexion::getConnexion();
    
    $request = $bd->getPdo()->prepare("Select * From Utilisateur where MAIL = :mail and Password = :mdp;");
    $request->bindParam(':mail', $mail);
    $request->bindParam(':mdp', $mdp);

    $request->execute();
    $result = $request->fetch(PDO::FETCH_ASSOC);
    json_encode($result);
    return $result;
}
?>