<?php
include 'requetes.php';
include 'jwt_utils.php';
$User = UserExistant($_POST["login"], $_POST["password"]);

if ($User){
    $authheader = get_authorization_header();
    $payload = $User;
    $secret = "iutinfo";
    $token = generate_jwt($authheader, $payload, $secret);
    base64url_encode($token);
    setcookie("token",$token,["path" => "/"]);
    header("Location: ../afficher.php");
    exit();
}
else{
    header("Location: ../index.php");
    exit();
}
?>