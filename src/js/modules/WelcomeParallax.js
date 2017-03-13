// WELCOME PARALLAX
module.exports = (function() {
        var paralaxContainer = $('.paralax'),
            layers = paralaxContainer.find('.paralax__layer');
        layers.each(function (index, value) {
            var bottomPosition = ((window.innerHeight / 2) * (index / 100));
            $(value).css({
                'bottom': '-' + bottomPosition + 'px'
            });
        });
        return  {
            init: function(){
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
            }
        }
}());
