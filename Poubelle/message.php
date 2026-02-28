<?php
class Message
{
    private int $idMessage;
    private string $date;
    private string $contenu;
    private Utilisateur $expediteur;
    private Groupe $destinataire;
    
    private function __construct(string $contenu, Utilisateur $expediteur, Groupe $destinataire){
        $this->date =  date('Y-m-d h:i:s', time());
        $this->contenu = $contenu;
        $this->expediteur = $expediteur;
        $this->destinataire = $destinataire;
    }

}
?>