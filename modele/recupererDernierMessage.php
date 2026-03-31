<?php
require_once "requetes.php";
include_once "connexion_sql.php";



//TODO html specialchars
$groupe = $_GET['groupe'];
$dateMess = $_GET['dateMess'];
$bd = Connexion::getConnexion();

$request = $bd->getPdo()->prepare("Select IDMESSAGE, DATEMESSAGE, CONTENU, NOM, PRENOM From Message, Utilisateur where IdGroupe = :id and Utilisateur.IDUTILISATEUR = Message.IDUTILISATEUR and DATEMESSAGE > :dateMess ORDER BY DateMessage ASC;");


$request->execute([':id' => $groupe,
                     ':dateMess' => $dateMess]);
$result = $request->fetchAll(PDO::FETCH_ASSOC);

$result = json_encode($result);
echo $result;

?>
