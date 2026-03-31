$(document).ready(function() {
    var token = document.cookie;
    var data = dechiffrerCookie(token);
    var groupe = 1;
    $("#message").keypress(function(e) {
        if(e.which == 13) {
            e.preventDefault();
            if ($("#message").val() == null || $("#message").val() == ""){}
            envoyerMessage(groupe, $("#message").val());
            $("#message").val("");
            reload(groupe);
        }
    });
    $("form").on("submit", function (e) {
            e.preventDefault();
    });
    //Bouton envoyé message
    $("#B_message").on("click",function (e) {
        e.preventDefault();
        if ($("#message").val() == null || $("#message").val() == ""){}
        envoyerMessage(groupe, $("#message").val());
        $("#message").val("");
        reload();
    });
    
    $("#SessionDe").html(data["NOM"] +" "+ data["PRENOM"]);
    getAllGroupes(data["IDUTILISATEUR"]);
    recupererMessage(groupe);

    setInterval(reload,1000,groupe);

  
});

function ChangementDeGroupe(idGroupe){
    groupe = idGroupe;
    $('#Discussion').html(" ");
    alert(idGroupe);
    recupererMessage(idGroupe);
}


function afficherMessage(values){
    let text = "";
    values.forEach(element => { 
        text +='<div class="message"> <span class="messDe">'+ element["NOM"]+ " " + element["PRENOM"] +'</span><br>'+ element["CONTENU"] +'<br> <span class="messInfo">'+ element["DATEMESSAGE"] +'</span></div>';
    });
    if (text != ""){
        $('#Discussion').html($('#Discussion').html() + text);
        $("#Discussion").scrollTop($("#Discussion")[0].scrollHeight);
    }
   
}

function afficherGroupe(groupes){
    let text = "";
    groupes.forEach(element => {
        text = text + "<li ><button onclick=ChangementDeGroupe(" + element["idGroupe"] +")>"+ element["NOMGROUPE"] +"</button></li>";
    });
    $('#listeGroupe').html(text);
}


async function reload(groupe) {
    //TODO enlever ce bloc
    dateMessage = $('.message .messInfo:last').text();
    recupererDernierMessage(groupe, dateMessage);
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
    xhr.open("GET", "modele/recupererDernierMessage.php?groupe=" + groupe +"&dateMess="+dateMessage, true);
    xhr.send();
}



/******************************* \/**
*                                   *
*                                   *
*    Fonctions XHR                  *
*                                   *
*                                   *
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
                $("#Discussion").scrollTop($("#Discussion")[0].scrollHeight);
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

//TODO retester
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