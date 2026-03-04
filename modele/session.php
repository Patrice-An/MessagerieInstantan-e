<?php
session_start(); 

if (!isset($_SESSION['Id'])) {
    echo "Veuillez vous connecter d'abord";
    header("Location: ../index.php");
} 

?>