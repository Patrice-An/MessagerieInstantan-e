<?php
    
    require_once "requetes.php";
    require_once "connexion_sql.php";
    
    //TODO html specialchars
    $idGroupe = $_POST['groupe'];
    $idUSer = $_POST['idUser'];
    $content = $_POST['content'];
    $bd = Connexion::getConnexion();
    
    $request = $bd->getPdo()->prepare("Insert INTO Message(DATEMESSAGE, CONTENU, IDGROUPE, IDUTILISATEUR) VALUES CURDATE(), :content, :idGroupe, :idUtilisateur;");
    $request->bindParam([':content'=> $content,
                        ':idGroupe' => $idGroupe
                        ':idUtilisateur' => $idUSer]);
    
    $request->execute();
    $result = $request->fetchAll(PDO::FETCH_ASSOC);
    $result = json_encode($result);
    echo $result;


?>