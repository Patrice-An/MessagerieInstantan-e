$(document).ready(function() {
    $("#message").keypress(function(e) {
        if(e.which == 13) {
            envoyerMessage();   
        }
    });
    $("form").on("submit", function (e) {
            e.preventDefault();
    });
    //Bouton envoyé message
    $("#B_message").on("click",function (e) {
            envoyerMessage();
    });


    var token = document.cookie;
    var data = dechiffrerCookie(token);
    getAllGroupes(data["IDUTILISATEUR"]);
  
   //recupererMessage();
});


function afficherMessage(id){
    let text = "";
    
    //TODO RENDRE LE MODEL FONCTIONNEL AVEC LA BD
    
   
    text +='<div class="message"> <span class="messDe">Mathieu</span><br> Coucou comment tu vas<br> <span class="messInfo">12h30</span></div>';
    $('#Discussion').html(text);
}

function afficherGroupe(groupes){
    let text = "";
    groupes.forEach(element => {
        text = text + "<li value="+ element["idGroupe"] +">"+ element["NOMGROUPE"] +"</li>";
    });
    $('#listeGroupe').html(text);
}


async function reload() {
    
}




function recupererMessage(){
    groupe = document.getElementById('message').value;
    var xhr = getXhr();
    // On défini ce qu'on va faire quand on aura la réponse
    xhr.onreadystatechange = function() {
        //Traitement seulement si on a tout reçu et que la réponse est ok
        if (xhr.readyState == 4 && xhr.status == 200) {
                value = xhr.responseText;
                value = JSON.parse(value);
            }
        }
        xhr.open("GET", "modele/.php?groupe=" + groupe, true);
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
function envoyerMessage() {
    groupe = document.getElementById('groupe').value;0
    var xhr = getXhr();
    // On défini ce qu'on va faire quand on aura la réponse
    xhr.onreadystatechange = function() {
        //Traitement seulement si on a tout reçu et que la réponse est ok
        if (xhr.readyState == 4 && xhr.status == 200) {
            value = xhr.responseText;
            value = JSON.parse(value);
            return value;
        }
    }
    xhr.open("POST", "modele/enregistrer.php", true);
    xhr.send(data);
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