// Still need to get current user's favorite books, find matching books, then add markers for other users who
// have matching favorite books. Could have database structure that looks like:
/*

users: [
    {
    username: username1,
    name: exampleName1,
    location: {
        coords: {
            latitude: 35.851579,
            longitude: -78.795865
        }
    favoriteBooks: [1, 2]
    },
    {
        username: username2,
        name: exampleName2,
        location: {
            coords: {
                latitude: 36.851579,
                longitude: -79.795865
            }
        favoriteBooks: [2, 3]
    }
]

books: [{
    bookid: 1,
    name: "Great Expectations"
    author: "Charles Dickens"
}, 
{
    bookid: 2,
    name: "Moby Dick"
    author: "Herman Melville"
}, 
{
    bookid: 3,
    name: "Harry Potter and the Chamber of Secrets"
    author: "J.K. Rowling"
}]

And we'd find all the users that have matching books, and then add markers that show what books you like 
in the tool tips.

*/

// Adds a marker to the map at the provided latitude/longitude (passed in as an array like [lat, long])
// with the provided mouse-over tool-tip text
// function addMarker(map, latLong, tooltipText){

//     if(typeof tooltipText === "string" && tooltipText.length > 0){
//         return L.marker(latLong).bindTooltip(tooltipText).addTo(map);
//     }
//     else{
//         return L.marker(latLong).addTo(map);
//     }
    
// }

// // If we can't get the user's location, set the class location as the default
// function useDefaultLocation(err){

//     console.log(err) // Log why we couldn't get the user's location

//     // Near 1500 RDU Center Drive
//     var defaultPosition = {
//         coords: {
//             latitude: 35.851579,
//             longitude: -78.795865
//         }
//     }

//     // Populate the map using the default location
//     populateMap(defaultPosition)
// }

// // This function populates the map given a target position
// function populateMap(position){
    
//     // Get the latitude/longitude out of the provided position object
//     var latLong = [position.coords.latitude, position.coords.longitude]
   
//     // Bind map to "mapid" div
//     var mymap = L.map('mapid').setView(latLong, 9);

//     // Add marker showing current location
//     addMarker(mymap, latLong, "My Location")

//     // Use the Leaflet library to hit the Mapbox API to get back a map, centered where the user currently is
//     L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 18,
//         id: 'mapbox.streets',
//         accessToken: 'pk.eyJ1IjoibmFucGluY3VzIiwiYSI6ImNqcm1xc3FiNTBtYW0zeW10dTcwdG44ZHoifQ.jruD3sCdhUgBrNIFXVUJVA'
//     }).addTo(mymap);
// }

// $(document).ready(function() {

//     // Use the HTML5 built-in get location function to return the user's current location
//     navigator.geolocation.getCurrentPosition(populateMap, useDefaultLocation);

// })