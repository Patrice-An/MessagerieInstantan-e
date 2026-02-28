<?php
class Utilisateur
{

    private int $idUtilisateur;
    private string $mail;
    private string $nom;
    private string $prenom;
    private array $groupe;
    
    private function __construct(string $nom, string $prenom, string $mail, array $groupe){
        $this->mail = $mail;
        $this->nom = $nom;
        $this->prenom = $prenom;
        $this->groupe = $groupe;
    }

}
?>