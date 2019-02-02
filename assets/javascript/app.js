

$("#left").on("click", function () {
    console.log("left was clicked");
    if (!$("#loginBox").is("none")){
            $("#loginBox").show();
            
    }
    // if (!$("#loginBox").is("show")){
    //         $("#loginBox").hide();
    // }  .css("display", "none"); 

}); // end the click

$("#right").on("click", function () {
    console.log("right was clicked");
    if (!$("#registerBox").is("none")){
        $("#registerBox").show();
    }
   
}); // end the click


