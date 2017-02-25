//GOOGLE MAPS
    if($('#googlemap').length){
        function initMap() {
            var styles = [
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#444444"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#e0efef"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "hue": "#1900ff"
                        },
                        {
                            "color": "#baf2ea"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "lightness": 100
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "lightness": 700
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#61dac9"
                        }
                    ]
                }
            ];

            var map = new google.maps.Map(document.getElementById('googlemap'), {
                center:  {lat: 53.858654, lng:  27.554122},
                scrollwheel: false,
                zoom: 14,
                styles: styles,
                disableDefaultUI: true
            });
            // Create marker
            var image = new google.maps.MarkerImage('assets/img/map_marker.svg',
                new google.maps.Size(60, 70),
                new google.maps.Point(0,0),
                new google.maps.Point(15, 50),
                new google.maps.Size(30, 45));
            var myMarker = new google.maps.Marker({
                position: {lat: 53.845173, lng: 27.533614},
                map: map,
                animation: google.maps.Animation.DROP,
                icon: image,
                title: "I'm here"
            });
            myMarker.setAnimation(google.maps.Animation.BOUNCE);

        }
    }
//paralax
$(function() {
    var paralaxContainer = $('.paralax'),
        layers = paralaxContainer.find('.paralax__layer');
    layers.each(function (index, value) {
        var bottomPosition = ((window.innerHeight / 2) * (index / 100));
        $(value).css({
            'bottom': '-' + bottomPosition + 'px'
        });
    });
    $(window).on('mousemove',function (e) {
        var mouseX = (e.pageX),
            mouseY = (e.pageY),
            X = (window.innerWidth / 2 ) - mouseX,
            Y = (window.innerHeight / 2 ) - mouseY;

        layers.each(function (index, value){
            var widthPosition = X * (index / 100 ),
                heightPosition = Y * (index / 100 ),
                bottomPosition = ((window.innerHeight / 2) * (index / 100));
            // console.log(index);
            // console.log(value);
            $(value).css({
                'bottom' : '-' + bottomPosition +'px',
                'transform': 'translate3d(' + widthPosition + 'px, ' + heightPosition + 'px, 0)'
            });
        });
    });
});
$(function() {
    var parallax = (function(){
        var bg = $('.header__bg'),
            user = $('.header__about-dev-wrap'),            
            sectionText = $('.portfolio__svg');

        return {
            move: function (block, windowScroll, strafeAmount){
                var strafe = windowScroll / -strafeAmount + '%';

                block.css('transform', 'translate3d(0,'+strafe+',0)');
                block.css('webkitTransform', 'translate3d(0,'+strafe+',0)');
            },

            init: function (wScroll){
                this.move(bg, -wScroll, 30);
                this.move(user, wScroll, 15);                
                this.move(sectionText, wScroll, 25);
            }
        }

    }());
   

    $(window).on('scroll', function(event) {
       var wScroll = window.pageYOffset;

       parallax.init(wScroll);
    });
});