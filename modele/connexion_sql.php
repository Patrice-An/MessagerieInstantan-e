<?php
class Connexion
{

    private static ?Connexion $init = null;
    private PDO $linkpdo;
    
    /*
    private static $host = 'localhost';
    private static $bd = 'r301';
    private static $user = 'root';
    private static $password = '$iutinfo';
    */
    private static $host = 'mysql-mailserver.alwaysdata.net';

    private static $bd = 'mailserver_r4a10';
    private static $user='mailserver_user';
    private static $password='sqlServerMail';

    private function __construct()
    {
        try {
            $this->linkpdo = new PDO(
                'mysql:host=' . Connexion::$host . ';dbname=' . Connexion::$bd,
                Connexion::$user,
                Connexion::$password
            );
        } catch (Exception $e) {
            die('Erreur : ' . $e->getMessage());
        }
    }

    public static function getConnexion(): Connexion
    {
        if (!isset(Connexion::$init)) {
            Connexion::$init = new Connexion();
        }
        return Connexion::$init;
    }

    public function getPdo(): PDO
    {
        return $this->linkpdo;
    }

}
?>