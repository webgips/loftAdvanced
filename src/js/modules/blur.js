//blur
module.exports = (function () {
        var blur = $('.form__blur'),
            section = $('.reviews');

        return {
            set: function () {
                var posTop = $('.contact').position().top,
                    posLeft = $('.contact__form-wrap').offset().left;

                blur.css({
                    'height': section.innerHeight(),
                    'width': section.width(),
                    'top': -posTop,
                    'left': -posLeft
                });
            }
        }
}());

