


$(function() {
    var preloader = require('./modules/preloader'),
        initMap = require('./modules/googlemap'),
        validate = require('./modules/validate'),
        workSlider = require('./modules/slider'),
        blurBg = require('./modules/blur'),
        slider = require('./modules/slider'),
        blognav = require('./modules/blognav'),
        headerParallax = require('./modules/HeaderParallax'),
        welcomeParallax = require('./modules/WelcomeParallax');




    //paralax
    // //parallax на welcome page

    //MENU
    $('.hamburger__link').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('.menu').toggleClass('active');
        $('.wrapper').toggleClass('full-screen');
    });
    //headerparallax на всех страницих кроме welcome
    $(window).on('scroll', function(event) {
       var wScroll = window.pageYOffset;
       headerParallax.init(wScroll);
    });
    //welcome page
    if ($('.welcome-wrap').length) {
        preloader();
        welcomeParallax.init();
        validate();
        $('.auth__btn').on('click', function (e) {
            e.preventDefault();
            $(this).css('display', 'none');
            $('.hero__welcome').toggleClass('flip');
        });
        $('#on__front').on('click', function (e) {
            e.preventDefault();
            $('.auth__btn').css('display', 'inline-block');
            $('.hero__welcome').toggleClass('flip');
        });
        $(document).on('click', function (e) {
            var $this = $(e.target);
            if (!$this.closest('.hero__welcome').length && !$this.closest('.auth__btn').length && $('.hero__welcome').hasClass('flip')) {
                $('.auth__btn').css('display', 'inline-block');
                $('.hero__welcome').toggleClass('flip');
            }
        });
    }
    //about page
    if($('.about').length){
        preloader();
        if($('#googlemap').length){
            initMap();
        }
    }
    //works page
    if($('.portfolio').length){
        preloader();
        workSlider.init('.slider__arrow');
        blurBg.set();
        validate();
        $(window).on('resize', function () {
            blurBg.set();
        });
    }
//ARROW BUTTONs
    $('.header__link-arrow').on('click', function (e) {
        e.preventDefault();
        var sectionTop = $('.wrapper').children().filter('section').first().offset().top;
        $('html,body').animate({scrollTop: sectionTop}, 'slow');
    });
    $('.reviews__link-arrow').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({scrollTop: 0}, 'slow');
    });

//BLOG page
    if ($('.blog').length) {
        preloader();
        $('.blog-nav__btn').on('click', function (e) {
            e.preventDefault();
            $(this).parent('.blog-nav').toggleClass('open');
            return false;
        });
        $(document).on('click', function (e) {
            var $this = $(e.target);
            if (!$this.closest('.blog-nav').length && $('.blog-nav').hasClass('open')) {
                $('.blog-nav').toggleClass('open');
            }
        });
        $('.blog-nav__link').on('click', function (e) {
            e.preventDefault();
            var href = $(this).attr('href');
            blognav.moveToPost(href);
        });
        $(window).on('scroll', function () {
            blognav.navListPos();
            blognav.activePost('.blog__item');
        });
    }

});

