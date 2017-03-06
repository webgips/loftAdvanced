// Slider
module.exports = (function () {
        var slider = $('.portfolio__slider'),
            slideList = slider.find('.slider__info'),
            prevControls = slider.find('.arrow-prev'),
            nextControls = slider.find('.arrow-next'),
            inMove = false,
            hide = false,
            activeSlideID,
            activeSlide = slideList.children().filter('.slider__info-item.active'),
            lastSlideID = slideList.children().filter('.slider__info-item:last-child').data('id'),
            firstSlideID = slideList.children().filter('.slider__info-item:first-child').data('id'),
            prevSlideID = activeSlide.prev().data('id') ? activeSlide.prev().data('id') : lastSlideID,
            nextSlideID = activeSlide.next().data('id') ? activeSlide.next().data('id') : firstSlideID;
        //копирование картинок для копки вперед
        nextControls.children('.slider__arrow-imgs').html(prevControls.children('.slider__arrow-imgs').html());
        //функция изменяет картинки на копках
        var changeBtnImgs = function () {
            prevControls.find('.slider__arrow-img[data-id="' + prevSlideID + '"]').addClass('img-active');
            nextControls.find('.slider__arrow-img[data-id="' + nextSlideID + '"]').addClass('img-active');
        }
        //функция изменяет информацию слайда, затем меняет переменные пред и след слайда
        var changeInfo = function (){
            $('.slider__info-item[data-id="' + activeSlideID + '"]').addClass('active');
            prevSlideID = $('.slider__info-item.active').prev().data('id') ? $('.slider__info-item.active').prev().data('id') : lastSlideID;
            nextSlideID = $('.slider__info-item.active').next().data('id') ? $('.slider__info-item.active').next().data('id') : firstSlideID;
        }
        // функция анимирует изнемение большой картинки
        var changeDisplayImg = function(){
            $('.slider__display-img').animate({opacity: 0}, 500)
                .queue(function(){
                    $(this).attr('src', $('.slider__info-item[data-id="' + activeSlideID + '"]').data('img'));
                    $(this).dequeue();
                });
            $('.slider__display-img').animate({opacity: 1}, 500)
        }
        changeBtnImgs();
        return {
            init : function (btns) {
                $(btns).on('click', function (e) {
                    e.preventDefault();
                    var $this = $(this),
                        directionPrev = $this.hasClass('arrow-prev');
                    if(!inMove){
                        inMove = true;
                        changeInfo();
                        $('.slider__info-item.active').removeClass('active');
                        $('.slider__arrow-img.img-active').removeClass('img-active');
                        //проверяем на какую кнопку нажали и передаем id нужного слайда
                        if (directionPrev) {
                            activeSlideID = prevSlideID;
                        } else {
                            activeSlideID = nextSlideID;
                        }
                        changeDisplayImg();
                        changeInfo();
                        changeBtnImgs();
                    }
                    $('.slider__arrow-img').on('transitionend',function () {
                        inMove = false;
                    })
                });
            }
        }
}());

