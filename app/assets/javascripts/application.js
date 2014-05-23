// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function() {
    var prev_infowindow = false;

    function initialize() {
        var mapOptions = {
            center: new google.maps.LatLng(37.7645, -122.4294),
            zoom: 2
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);


        $.get("/pins.json").done(function(data) {
            data.forEach(function(pin) {
                var lng = pin.longitude;
                var lat = pin.latitude;
                var email = pin.user_email
                var newMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map: map
                });
                var infowindow = new google.maps.InfoWindow({
                    content: "Created by: " + email
                });

                google.maps.event.addListener(newMarker, 'click', function() {
                    if (prev_infowindow) {
                        prev_infowindow.close();
                    }
                    prev_infowindow = infowindow;
                    infowindow.open(map, newMarker);
                });
            });
        }).fail(function() {
            alert("Load was NOT performed.");
        });

        google.maps.event.addListener(map, 'click', function(event) {
            var lng = event.latLng.lng();
            var lat = event.latLng.lat();
            $.post('/pins', {
                pins: {
                    longitude: lng,
                    latitude: lat,
                    user_email: gon.user_email
                }
            })
                .success(function(data) {
                    var newMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(lat, lng),
                        map: map
                    });

                    var infowindow = new google.maps.InfoWindow({
                        content: "Created by: " + gon.user_email
                    });

                    google.maps.event.addListener(newMarker, 'click', function() {
                        if (prev_infowindow) {
                            prev_infowindow.close();
                        }
                        prev_infowindow = infowindow;
                        infowindow.open(map, newMarker);
                    });

                })
                .error(function() {
                    alert("Server is broken!");
                });
        });
    };
    google.maps.event.addDomListener(window, 'load', initialize);

});