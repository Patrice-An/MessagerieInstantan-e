<?php
session_start();

if (isset($_SESSION['id'])) {
    echo "Bonjour " . $_SESSION['id'];
} else {
    echo "Veuillez vous connecter d'abord";
}

?>