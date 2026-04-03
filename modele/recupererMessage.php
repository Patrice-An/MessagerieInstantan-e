<?php
//Recupère tout les messages d'un Groupe de discussion
include_once "connexion_sql.php";

$groupe = $_GET['groupe'];
$bd = Connexion::getConnexion();

$request = $bd->getPdo()->prepare("Select IDMESSAGE, DATEMESSAGE, CONTENU, NOM, PRENOM From Message, Utilisateur where IdGroupe = :id and Utilisateur.IDUTILISATEUR = Message.IDUTILISATEUR ORDER BY DateMessage ASC;");
$request->bindParam(':id', $groupe);

$request->execute();
$result = $request->fetchAll(PDO::FETCH_ASSOC);
$result = json_encode($result);
echo $result;


?>
