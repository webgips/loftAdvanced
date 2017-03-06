module.exports = (function () {
            var blogNav = $('.blog__left'),
                navList = $(blogNav).find('.blog-nav__list'),
                blogList = $('.blog__list'),
                posts = blogList.children();
            return {
                moveToPost: function (href) {
                    var postY = posts.filter(href).offset().top;
                    $('html,body').animate({scrollTop: postY}, 'slow');
                },
                navListPos: function () {
                    var wScroll = $(window).scrollTop(),
                        blogNavTop = $(blogNav).offset().top;
                    if (blogNavTop < wScroll) {
                        navList.css('top', wScroll - blogNavTop + 40);
                    }
                    else {
                        navList.css('top', 0);
                    }
                },
                activePost: function (selector) {
                    $(selector).each(function (index) {
                        var $this = $(this),
                            postTop = $this.offset().top - 50,
                            postBottom = $this.offset().top + $this.innerHeight(),
                            navList = $('.blog-nav__list'),
                            navLinks = navList.find('.blog-nav__link'),
                            activeLink = navLinks.filter('.blog-nav__link-active'),
                            wScroll = $(window).scrollTop();

                        if (postTop < wScroll && postBottom > wScroll) {
                            navLinks.removeClass('blog-nav__link-active');
                            navLinks.eq(index).addClass('blog-nav__link-active');
                        }
                    });
                }
            }
}());
