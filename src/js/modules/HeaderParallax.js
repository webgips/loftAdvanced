//HEADER PARALLAX  
module.exports = (function() {
    var parallax;
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