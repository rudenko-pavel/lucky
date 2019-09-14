var initMap = function() {
  var str = window.location.search.substring(1).split(":");
  var runFn = str[0];
 
  /****************** event start *************************/
  var event = function(){
    
    var xC = $.coordsGps[0];
    var yC = $.coordsGps[1];
    var myLatLng = {lat: xC, lng: yC};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: myLatLng
    });

    var contentString = $.coordsName;

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: $.coordsName
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }
  /****************** event end *************************/
  /****************** events start *************************/
var events = function(){
  var locations = [];
  var titles = [];

  $.each( $.eventsData, function(key, value) {
    locations.push({"lat":$.eventsData[key]["coords"][1][0],"lng":$.eventsData[key]["coords"][1][1]})
    titles.push({"title":$.eventsData[key]["name-en"]})
  }) 

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: 50.5044375, lng: 17.3932296}
  });

  // Create an array of alphabetical characters used to label the markers.
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "locations" array.
  // The map() method here has nothing to do with the Google Maps API.
  var markers = locations.map(function(location, i) {
    
     var a = new google.maps.Marker({
      position: location,
      label: labels[i % labels.length],
      title: titles[i]["title"]
    });

    return (a);
  });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    }
  /****************** events end *************************/


var defaultFn = function(){
  console.log("defaultFn defaultFn defaultFn");
}

  /************* switch ***************/  
  switch(runFn) {
    case 'event':  
      event();
      break;
    case 'events':
      events();
      break;
    default:
      defaultFn();
      break;
  }
}