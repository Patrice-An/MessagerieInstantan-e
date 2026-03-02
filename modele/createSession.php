<?php
include 'requetes.php';

$User = UserExistant($_POST["login"], $_POST["password"]);
if ($User){
    session_start();
    $_SESSION["id"] = $User["idUtilisateur"];
    exit();
}
else{
    header("Location: ../index.php");
    exit();
}


?>