function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    disableDefaultUI: true,
    scrollwheel: false,
    center: {lat: 43.6483, lng: -79.3979}
  });

  var image = 'dist/images/marker.png';
  var marker = new google.maps.Marker({
    position: {lat: 43.6483, lng: -79.3979},
    map: map,
    icon: image
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
