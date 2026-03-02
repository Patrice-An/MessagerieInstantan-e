<?php
require_once "requetes.php";

if ($_GET["Limit"] == NULL){
    echo getAllMessages($_GET["groupe"]);
}


?>
