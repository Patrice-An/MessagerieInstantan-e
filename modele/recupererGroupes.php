<?php
//Récupère la liste des groupes de l'utilisateur
include_once "connexion_sql.php";

$idUser = $_GET['idUser'];

$bd = Connexion::getConnexion();

$request = $bd->getPdo()->prepare("Select Groupe.IDGROUPE idGroupe, Groupe.NOMGROUPE  From Appartenir, Groupe where Groupe.IDGROUPE = Appartenir.IDGROUPE  AND IDUTILISATEUR = :id;");
$request->bindParam(':id', $idUser);


$request->execute();
$result = $request->fetchAll(PDO::FETCH_ASSOC);

$result = json_encode($result);
echo $result;


?>