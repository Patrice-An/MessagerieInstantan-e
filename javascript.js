$(document).ready(function() {
    var token = document.cookie;
    var data = dechiffrerCookie(token);
    var groupe = 1;
    $("#message").keypress(function(e) {
        if(e.which == 13) {
            envoyerMessage(groupe, $("#message").val());
            $("#message").val("");
        }
    });
    $("form").on("submit", function (e) {
            e.preventDefault();
    });
    //Bouton envoyé message
    $("#B_message").on("click",function (e) {
          envoyerMessage(groupe, $("#message").text());
          $("#message").val("");
    });
    


    $("#SessionDe").html(data["NOM"] +" "+ data["PRENOM"]);
    getAllGroupes(data["IDUTILISATEUR"]);
    recupererMessage(groupe);
});

function ChangementDeGroupe(idGroupe){
    groupe = idGroupe;
    recupererMessage(idGroupe);
}


function afficherMessage(values){
    let text = "";
    
    //TODO RENDRE LE MODEL FONCTIONNEL AVEC LA BD
    values.forEach(element => { 
        text +='<div class="message"> <span class="messDe">'+ element["NOM"]+ " " + element["PRENOM"] +'</span><br>'+ element["CONTENU"] +'<br> <span class="messInfo">'+ element["DATEMESSAGE"] +'</span></div>';
    });

    $('#Discussion').html(text);
}

function afficherGroupe(groupes){
    let text = "";
    groupes.forEach(element => {
        text = text + "<li ><button onclick=ChangementDeGroupe(" + element["idGroupe"] +")>"+ element["NOMGROUPE"] +"</button></li>";
    });
    $('#listeGroupe').html(text);
}


async function reload() {
    
}

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
    xhr.open("GET", "modele/recupererDernierMessage.php?groupe=" + groupe +"?dateMess=" +dateMessage, true);
    xhr.send();
}



/******************************* \/
*
*
    Fonctions XHR
*
*
***********************************/


function recupererMessage(groupe){
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
        xhr.open("GET", "modele/recupererMessage.php?groupe=" + groupe, true);
        xhr.send();
}
    
function dechiffrerCookie(token){
        payload = token.split(".")[1];
        payloadDecode = atob(payload);
        data = JSON.parse(payloadDecode);   
        return data;
}
    
function getAllGroupes(idUser) {
    var xhr = getXhr();
    // On défini ce qu'on va faire quand on aura la réponse
    xhr.onreadystatechange = function() {
        //Traitement seulement si on a tout reçu et que la réponse est ok
        if (xhr.readyState == 4 && xhr.status == 200) {
            value = xhr.responseText;
            value = JSON.parse(value);
            afficherGroupe(value);
        }
    }
    xhr.open("GET", "modele/recupererGroupes.php?idUser="+ idUser , true);
    xhr.send();
}
    /*TODO Change cette méthode*/ 
function envoyerMessage(groupe, content) {
    idUser = data["IDUTILISATEUR"];
    datas = { "idUser" : idUser,
        "groupe": groupe,
        "content" : content
        };
    datas = JSON.stringify(datas);
    var xhr = getXhr();
    // On défini ce qu'on va faire quand on aura la réponse
    xhr.onreadystatechange = function() {
        //Traitement seulement si on a tout reçu et que la réponse est ok
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert("Message envoyé");
        }
    }
    xhr.open("POST", "modele/enregistrer.php", true);
    xhr.send(datas);
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