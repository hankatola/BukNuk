$(document).ready(function () {


    /*
        Firebase
        ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    */
    var config = {
        apiKey: "AIzaSyCLQQaC2PjCbaoYwkeYea8mlJeNwX-G7Y4",
        authDomain: "project1test-346b5.firebaseapp.com",
        databaseURL: "https://project1test-346b5.firebaseio.com",
        projectId: "project1test-346b5",
        storageBucket: "project1test-346b5.appspot.com",
        messagingSenderId: "712815187401"
    };
    firebase.initializeApp(config);
    //set firebase ref//
    var database = firebase.database();
    var storage = firebase.storage();
    var storageRef = storage.ref();

    //set variable to hold unique user ID of logged in user. This is used to save user data later on//
    var currentUser = "";
    var currentUserLocation = { // Set our class as the default location if we can't get the location
         
            latitude: 35.851579,
            longitude: -78.795865
        }
    

    navigator.geolocation.getCurrentPosition(function(position) {
        var userLocation = {
            coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        }
        currentUserLocation = userLocation
    })

    //sign up action//
    $("#signupSubmit").on("click", function (e) {
        e.preventDefault();
        var email = $("#signupEmail").val().trim();
        var password = $("#signupPassword").val().trim();
        console.log(email, password);
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function () {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(function(user) {
                    // When we create a new user, set up the database entry using UID as key
                    currentUserLocation = JSON.stringify(currentUserLocation);
                    console.log(currentUserLocation)
                        firebase.database().ref('users/' + user.user.uid).set({
                            username: email, // Default user-name to e-mail
                            location: currentUserLocation,
                            favoriteBooks: []
                        });

                    }, function(error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode, errorMessage)
                    });
                })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
                alert("please try again, Sign Up unsuccesful")
            });
    });

    //sign in action//
    $("#signinSubmit").on("click", function (e) {
        e.preventDefault();
        var email = $("#signinEmail").val().trim();
        var password = $("#signinPassword").val().trim();
        console.log(email, password);
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function () {
                firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                  });
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    });

    //sign user out//
    $("#sign-out-button").on("click", function () {
        firebase.auth().signOut();
        window.location = "signOut.html"

    });

    ///user can chose profile pic from computer, need to add to firebase as will not be stored on page refresh//
    $("#chooseAProfilePic").change(function () {
        uploadPic(this);
    });

    function uploadPic(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blank-profile-pic').attr('src', e.target.result);
            }


            reader.readAsDataURL(input.files[0]);
        }

    }

    //user profile update//
    $("#changesBtn").on("click", function () {

        var username = $("#exampleInputUsername1").val().trim();
        firebase.database().ref('users/' + currentUser).update({
             username:username,


        });
        //store image to firebase//
        var file = $('#chooseAProfilePic').get(0).files[0];
        var name = "profilePic" + currentUser;
        var metadata = {
            contentType: file.type
        };
        storageRef.child(name).put(file, metadata);

    })
    ///update user info on save//
    database.ref().child("users").on("value", function (snapshot) {
        thisUser = (snapshot.child(currentUser).val());
        console.log(thisUser.username);
        var name = thisUser.username;
        $("#userID").text(name);
    });


    //if user is logged in do this//

    var unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            currentUser = user.uid;
            //update profile pic to that stored in firebase database//
            var picRef = storageRef.child("profilePic" + currentUser + "");
            picRef.getDownloadURL().then(function (url) {
                $('#blank-profile-pic').attr('src', url);
            })
            //if logged in direct to user.html//
            if (window.location.href.includes('index.html') || window.location.href === "https://hankatola.github.io/BukNuk/") {
                window.location = "user.html"
                unsubscribe();


            }

        } else {
            
        }

    });





    var regBtn = $("#registerBox");
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

    /*
        Google Books API
        ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    */
    // Functions
    function bookSearch(α) {
        // TODO: confirm images append to correct location
        α.preventDefault()
        $('#titleScroll').empty()
        α = $('#bookSearch').val()
        $('#bookSearch').val('')
        let url = 'https://www.googleapis.com/books/v1/volumes?q=' + α
        $.get(url).then(function (β) {
            for (let i in β.items) {
                let imgURL = β.items[i].volumeInfo.imageLinks.thumbnail
                let γ = $('<div>').addClass('search-image').attr('data-id', β.items[i].id)
                $('<img>').attr('src', imgURL).attr('data-id', β.items[i].id).appendTo(γ)
                γ.appendTo($('#titleScroll'))


            }
        })
    }

    function bookDetail() {
        // TODO: append ω data to correct place
        $('#search-results').empty()
        let α = $(this).attr('data-id')
        let url = 'https://www.googleapis.com/books/v1/volumes/' + α
        $.get(url).then(function (β) {
            /*
                Parse out needed data from return value β and store in ω
                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
            */
            let ω = {
                title: β.volumeInfo.title,
                author: β.volumeInfo.authors[0],
                rating: β.averageRating,
                description: β.volumeInfo.description, // should be inputted as .html(description)
                publisher: β.volumeInfo.publisher,
                date: β.volumeInfo.publishedDate,
                pages: β.volumeInfo.pageCount,
                link: β.volumeInfo.previewLink,
                forSale: β.saleInfo,
                image: β.volumeInfo.imageLinks.thumbnail,
            }

            /*
                Create html objects from data in ω
                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
            */
            // create image & favorite button
            let img = $('<img>').attr('src', ω.image).attr('data-id', α)
            let btn = $('<button>').addClass('btn btn-primary').attr('id', 'add-to-favorites').text('Add to Favorites')
            // Image & button is img
            img.append(btn)

            // create info section
            let ttle = $('<div>').html('<strong>' + ω.title + '</strong>')
            let athr = $('<div>').text('Author: ' + ω.author)
            if (ω.rating) {
                ω.rating = ω.rating + '/5'
            } else {
                ω.rating = 'None'
            }
            if (!ω.publisher || ω.publisher === undefined || ω.publisher === null) {
                ω.publisher = 'No data available'
            }
            let rtng = $('<div>').text('Rating: ' + ω.rating)
            let pges = $('<div>').text('Pages: ' + ω.pages)
            let pubr = $('<div>').text('Publisher: ' + ω.publisher)
            let pbdt = $('<div>').text('Date: ' + ω.date)
            let link = $('<div>').html('<a href="' + ω.link + '">View on Google Play Books</a>')
            // info object is ttle
            ttle.append(athr, rtng, pges, pubr, pbdt, link)

            // create row 1
            // col 2
            let detail = $('<div>').addClass('col')
            // detail is detail div within a column
            ttle.appendTo(detail)

            // col 1
            let image = $('<div>').addClass('col')
            img.appendTo(image)
            // row 1
            let row1 = $('<div>').addClass('row')
            detail.appendTo(row1)
            image.prependTo(row1)

            // create row 2
            let row2 = $('<div>').addClass('row book-description').html(ω.description)
            // append row 2 to row 1
            row1.append(row2)

            /*
                Append description object to target
                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
            */
            row1.appendTo($('#search-results'))
        })
    }

    // Listeners

    $(document).on('click', '.book-search-form', bookSearch)
    $(document).on('click', '.search-image', bookDetail)



    //document on ready closing tab//
});