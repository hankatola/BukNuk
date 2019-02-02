var regBtn =  $("#registerBox");
var signBtn = $("#loginBox")

$("#left").on("click", function () {
    console.log("left was clicked");
    
    console.log($("#registerBox"));
    console.log(regBtn);
    if (regBtn.css("display") !== "block") {
        regBtn.css("display", "block");
        signBtn.css("display", "none");
    } else {
        regBtn.css("display", "none");
    }

}); // end the click

$("#right").on("click", function () {
    console.log("right was clicked");
    if (signBtn.css("display") !== "block") {
        signBtn.css("display", "block");
        regBtn.css("display", "none");
    } else {
        signBtn.css("display", "none");
    }
    
      
}); // end the click
