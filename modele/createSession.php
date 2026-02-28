<?php
include 'requetes.php';


if (UserExistant('Bob','mdp123') == TRUE){
    session_start();
}
else{
    header("Location: ../index.php");
    exit();
}


?>