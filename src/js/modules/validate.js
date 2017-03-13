
module.exports = function () {
    function validate(form) {
        var
            inputs = form.find('input, textarea'),
            empty = false,
            emailError = false;
        inputs.each(function () {
            var
                $this = $(this),
                value = $this.val();

            if (value === '') {
                empty = true;
                return;
            }

            if ($this.attr('type') === 'email') {
                var RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                emailError = !RegExp.test(value);
            }
        });
        if (empty) {
            $.fancybox('<span class="fancybox__popup"> Вы заполнили не все поля формы!</span>');
            return false;
        }
        if (emailError) {
            $.fancybox('<span class="fancybox__popup" >Введите корректный Email </span>');
            return false;
        }
        return true;
    }

    $('form button[type=submit]').click(function (e) {
        e.preventDefault();
        var form = $(this).closest('form');
        return validate(form);
    });
};