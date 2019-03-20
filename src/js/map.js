function initMap() {
  var myStyles =[
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    }
  ];

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    disableDefaultUI: true,
    scrollwheel: false,
    center: {lat: 43.6483, lng: -79.3979},
    styles: myStyles
  });

  var infowindow = new google.maps.InfoWindow({
    content: '<p><strong>Loose Chain Bike Co.</strong></p><p>483 Queen Street West</p><p>Toronto, ON M5V 2A9</p>'
  });

  var image = 'dist/images/marker.png';
  var marker = new google.maps.Marker({
    position: {lat: 43.6483, lng: -79.3979},
    map: map,
    icon: image
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  var center;

  function calculateCenter() {
    center = map.getCenter();
  }

  google.maps.event.addDomListener(map, 'idle', function() {
    calculateCenter();
  });

  google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(center);
  });
};

var tag = document.createElement('script');
    tag.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAsofyZPUvRBbwnj3M07hmnG8iJiKoy354&callback=initMap";
    tag.defer = true;
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
