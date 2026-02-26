$(document).ready(function() {
    $("#message").keypress(function(e) {
        if(e.which == 13) {
            alert('Entrée !!');
        }
    });

    $("form").on("submit", function (e) {
            e.preventDefault();
    });
    
    /*
    TODO
    Modifier ICI par la requete PHP
    */
   $(".User").html("Mathieu");
   afficherMessage();
    
});


function afficherMessage(){
    let text = "";
    /*
    TODO RENDRE LE MODEL FONCTIONNEL AVEC LA BD
     de
   
    */
    text +='<div class="message"> <span class="messDe">Mathieu</span><br> Coucou comment tu vas<br> <span class="messInfo">12h30</span></div>';




    $('#Discussion').html(text);


}

function afficherGroupe(){
    let text = "";
     /*
     TODO RENDRE LE MODEL FONCTIONNEL AVEC LA BD
      de
    
     */
    text +='<li>TEST</li>';

    $('#listeGroupe').html(text);
}


function reload(){
    /*TODO Implémenter Reload */
}



