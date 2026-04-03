//Si l'utilisateur ne s'est pas connecter redirige vers la page de login
if (!document.cookie.includes('token=')){
    window.location.href ="index.php";
}

var groupe = 1;
var nameGroupe = "Groupe Principal";

//traitement au chargement complet de la page
$(document).ready(function() {

    //récupération des informations du token
    var token = document.cookie;
    var data = dechiffrerCookie(token);
    
    //Gestion de l'envoi du message au click sur la touche ENTRÉE
    $("#message").keypress(function(e) {
        if(e.which == 13) {
            e.preventDefault();
            if ($("#message").val() == null || $("#message").val() == ""){}
            envoyerMessage(groupe, $("#message").val());
            $("#message").val("");
            reload(groupe);
        }
    });
    //Annule le chargement de la page à la validation du formulaire 
    $("form").on("submit", function (e) {
            e.preventDefault();
    });
    //Gestion du bouton envoyé message
    $("#B_message").on("click",function (e) {
        e.preventDefault();
        if ($("#message").val() == null || $("#message").val() == ""){}
        envoyerMessage(groupe, $("#message").val());
        $("#message").val("");
        reload();
    });
    
    // Affichage du nom de l'utilisateur sur sa session et du groupe sur lequel il est
    $("#SessionDe").html("Connecter en tant que "+data["NOM"] +" "+ data["PRENOM"]);

    //Récupération des groupes de l'utilisateurs et des messages 
    getAllGroupes(data["IDUTILISATEUR"]);
    recupererMessage(groupe);
    $("#NomDuGroupe").html(nameGroupe);

    //Rafraichissement et affichage des noouveaux messages
    setInterval(reload,5000);
});

//Traitement lors d'un changement de groupe de l'utilisateur 
function ChangementDeGroupe(btn, idGroupe){
    groupe = idGroupe;
    //Récupère le nom du groupe 
    nameGroupe = $(btn).val();
    $("#NomDuGroupe").html(nameGroupe);
    $('#Discussion').html(" ");
    recupererMessage(idGroupe);
}


//Affiche les messages dans values
function afficherMessage(values){
    let text = "";
    //Creer la box de tout les messages 
    values.forEach(element => { 
        text +='<div class="message"> <span class="messDe">'+ element["NOM"]+ " " + element["PRENOM"] +'</span><br>'+ element["CONTENU"] +'<br> <span class="messInfo">'+ element["DATEMESSAGE"] +'</span></div>';
    });
    //Si il y a pas de texte ajouter on ne fais rien
    if (text != ""){
        $('#Discussion').html($('#Discussion').html() + text);
        $("#Discussion").scrollTop($("#Discussion")[0].scrollHeight);
    }
}


//Affiche les différents groupes de l'utilisateurs
function afficherGroupe(groupes){
    let text = "";
    //ajoute un bouton pour chaque groupe
    groupes.forEach(element => {
        text = text + '<li><button value="'+ element["NOMGROUPE"] +'" onclick="ChangementDeGroupe(this, ' + element["idGroupe"] + ')">'+ element["NOMGROUPE"] +'</button></li>';
    });
    $('#listeGroupe').html(text);
}


async function reload() {
    //récupération de la date du dernier message afficher
    dateMessage = $('.message .messInfo:last').text();
    recupererDernierMessage(groupe, dateMessage);
}


//Déchiffre le cookie d'authentification
function dechiffrerCookie(token){
        payload = token.split(".")[1];
        payloadDecode = atob(payload);
        data = JSON.parse(payloadDecode);   
        return data;
}
    
















/******************************* \/**
*                                   *
*                                   *
*    Fonctions XHR                  *
*                                   *
*                                   *
***********************************/
//fonction qui récupère les nouveaux messages 
function recupererDernierMessage(groupe, dateMessage){
    var xhr = getXhr();
    // On défini ce qu'on va faire quand on aura la réponse
    xhr.onreadystatechange = function() {
        //Traitement seulement si on a tout reçu et que la réponse est ok
        if (xhr.readyState == 4 && xhr.status == 200) {
                value = xhr.responseText;
                value = JSON.parse(value);
                afficherMessage(value);
            }
        }
    xhr.open("GET", "modele/recupererDernierMessage.php?groupe=" + groupe +"&dateMess="+dateMessage, true);
    xhr.send();
}


//fonction qui récupère tout les messages d'un groupe
function recupererMessage(groupe){
    var xhr = getXhr();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
                //récupération de tout les messages d'une conversion défini
                value = xhr.responseText;
                value = JSON.parse(value);
                afficherMessage(value);
                $("#Discussion").scrollTop($("#Discussion")[0].scrollHeight);
            }
        }
        xhr.open("GET", "modele/recupererMessage.php?groupe=" + groupe, true);
        xhr.send();
}



//Fonction qui demande à la bd la liste des groupes de l'utilisateur
function getAllGroupes(idUser) {
    var xhr = getXhr();
    xhr.onreadystatechange = function() {
        //Traitement seulement si on a tout reçu et que la réponse est ok
        if (xhr.readyState == 4 && xhr.status == 200) {
            //Récuperation des informations des groupes 
            value = xhr.responseText;
            value = JSON.parse(value);
            afficherGroupe(value);
        }
    }
    xhr.open("GET", "modele/recupererGroupes.php?idUser="+ idUser , true);
    xhr.send();
}




//Fonction ajax qui envoie le message pour l'enregistrement en base de donnée
function envoyerMessage(groupe, content) {
    idUser = data["IDUTILISATEUR"];
    datas = "idUser="+idUser +"&groupe="+ groupe + "&content=" +content;    
    $.ajax({
    type: "POST",
    url: "modele/enregistrer.php",
    data: datas,
    success: function () {
    }
    });
}





function getXhr() {
    var xhr = null;
    if (window.XMLHttpRequest) // Firefox et autres
        xhr = new XMLHttpRequest();
    else if (window.ActiveXObject) { // Internet Explorer
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
    } else { // XMLHttpRequest non supporté par le navigateur
        alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest");
        xhr = false;
    }
    return xhr;
}