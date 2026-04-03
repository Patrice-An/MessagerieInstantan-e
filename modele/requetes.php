<?php
include 'connexion_sql.php';

//Fonction qui vérifie si un user est dans un groupe
function isInGroup($idUser, $idGroupe){
    $bd = Connexion::getConnexion();
    
    $request = $bd->getPdo()->prepare("Select COUNT(*) From Appartenir where IdUser = :id AND idGroupe = :groupe;");
    $request->bindParam(':id', $idUser);
    $request->bindParam(':groupe', $idGroupe);

    $request->execute();
    $result = $request->fetchColumn(0 );

    return $result;
}

//Fonction qui vérifie si l'utilisateur et son mdp existe 
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