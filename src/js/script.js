
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
            
            $(value).css({
                'bottom' : '-' + bottomPosition +'px',
                'transform': 'translate3d(' + widthPosition + 'px, ' + heightPosition + 'px, 0)'
            });
        });
    });
});
$(function() {
    var parallax;
    parallax = (function () {
        var bg = $('.header__bg'),
            user = $('.header__about-dev-wrap'),
            sectionText = $('.portfolio__svg');

        return {
            move: function (block, windowScroll, strafeAmount) {
                var strafe = windowScroll / -strafeAmount + '%';

                block.css('transform', 'translate3d(0,' + strafe + ',0)');
                block.css('webkitTransform', 'translate3d(0,' + strafe + ',0)');
            },

            init: function (wScroll) {
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


$(function() {
//blur
    var blurBg = (function(){
        var blur = $('.form__blur'),
            section = $('.reviews');

        return{
            set: function(){
                var posTop = $('.contact').position().top,
                    posLeft = $('.contact__form-wrap').offset().left;

                blur.css({
                    'height' : section.innerHeight(),
                    'width' : section.width(),
                    'top' : -posTop,
                    'left' : -posLeft
                });
            }
        }
    }());
    if($('.reviews').length){
        blurBg.set();
        $(window).on('resize', function(){
            blurBg.set();
        });
    }
//MENU
    $('.hamburger__link').on('click',function(e){   
        e.preventDefault();
        $(this).toggleClass('active');     
        $(this).siblings('.menu').toggleClass('active');
        $('.wrapper').toggleClass('full-screen');        
    });
//BLOG MENU
    $('.blog-nav__btn').on('click',function(e){
        e.preventDefault();
        $(this).parent('.blog-nav').toggleClass('open');
        return false;
    });

//flip
   if($('.welcome-wrap').length){

         $('.auth__btn').on('click',function(e) {
            e.preventDefault();
            $(this).css('display', 'none');
            $('.hero__welcome').toggleClass('flip');
        });    

        $('#on__front').on('click',function(e) {
            e.preventDefault();
            $('.auth__btn').css('display', 'inline-block');
            $('.hero__welcome').toggleClass('flip');
        });
       $(document).on('click', function(e) {           
           var $this = $(e.target);
           if(!$this.closest('.hero__welcome').length && !$this.closest('.auth__btn').length && $('.hero__welcome').hasClass('flip')){
            $('.auth__btn').css('display', 'inline-block');
            $('.hero__welcome').toggleClass('flip');
           }
       });
    }
//ARROW BUTTONs
    $('.header__link-arrow').on('click', function(e){
        e.preventDefault();
        var sectionTop = $('.wrapper').children().filter('section').first().offset().top;
        $('html,body').animate({scrollTop: sectionTop}, 'slow');
    });
    $('.reviews__link-arrow').on('click',function(e){
        e.preventDefault();        
        $('html,body').animate({scrollTop: 0},'slow');
    });
//BLOG
    var blogNav = (function(){
        var blogNav = $('.blog__left'),
            navList = $(blogNav).find('.blog-nav__list'),
            blogList = $('.blog__list'),
            posts = blogList.children();

        return {
            moveToPost: function (href) {
                var postY = posts.filter(href).offset().top;
                $('html,body').animate({scrollTop: postY},'slow');
            },
            navListPos: function () {
                var wScroll = $(window).scrollTop(),
                    blogNavTop = $(blogNav).offset().top;
                if(blogNavTop<wScroll){
                    navList.css('top', wScroll-blogNavTop+40);
                }
                else {
                    navList.css('top', 0);
                }
            },
            activePost: function (selector) {
                $(selector).each(function (index) {
                    var $this = $(this),
                        postTop = $this.offset().top-50,
                        postBottom = $this.offset().top + $this.innerHeight(),
                        navList= $('.blog-nav__list'),
                        navLinks = navList.find('.blog-nav__link'),
                        activeLink = navLinks.filter('.blog-nav__link-active'),
                        wScroll = $(window).scrollTop();

                    if(postTop < wScroll && postBottom > wScroll ){
                        navLinks.removeClass('blog-nav__link-active');
                        navLinks.eq(index).addClass('blog-nav__link-active');
                    }
                });
            }
        }
    }());

    $('.blog-nav__link').on('click', function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        console.log(href);
        blogNav.moveToPost(href);
    });
    $(window).on('scroll', function () {
        blogNav.navListPos();
        blogNav.activePost('.blog__item');
    })























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
            var image = new google.maps.MarkerImage('assets/img/icons/map_marker.svg',
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
});
