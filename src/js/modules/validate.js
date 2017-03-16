
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
       if(validate(form)){
            if(form.hasClass('contact__form')){
                $.post($(location).attr('href'),{
                    name: $(form).find('input[name=name]').val(),
                    email: $(form).find('input[name=email]').val(),
                    text: $(form).find('textarea').val()
                    },
                function(data) {
                    var status = data.status;
                    $.fancybox(`<span class="fancybox__popup">${status} </span>`,{
                        minWidth: 400,
                        maxHeight: 50,
                        afterClose: function(){                                    
                           form.find('.form__reset').trigger("click");
                        }
                    });
                });         
            }
            if(form.hasClass('welcome__login-form')){
                $.post($(location).attr('href'),{
                    login: $(form).find('input[name=login]').val(),
                    password: $(form).find('input[name=password]').val()
                    },
                function(data) {
                    console.log('otpravili post auth')
                    console.log(data); 
                    var status = data.status;
                    $.fancybox(`<span class="fancybox__popup">${status} </span>`,{
                        minWidth: 400,
                        maxHeight: 50,
                        afterClose: function(){    
                            console.log(data);                                
                            if (typeof data.redirect == 'string'){
                                window.location = data.redirect;
                            }                       
                        }
                    });
                });         
            }       
       }

    });
};