$(function(){

    (function clicks() {

        $('.change').click(changeMenu);
        $('#login_in-btn').click(checkLogIn);
        $('#sign_up-btn').click(checkSignUp);

    })();

    function changeMenu() {

        if($('.active').hasClass('log_in')) {

            $('.log_in').removeClass('active').hide();
            $('.sign_up').addClass('active').show();
        } else {

            $('.sign_up').removeClass('active').hide();
            $('.log_in').addClass('active').show();
        }
    }

    function filterUsersValue(obj) {

        let regString = /^[0-9a-zA-Z]{5,20}$/i;

        for(let prop in obj) {

            if(obj.hasOwnProperty(prop)) {

                if(prop === 'email') {

                    let regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if(!regMail.test(obj[prop])) return false;

                } else {

                    if(!regString.test(obj[prop])) return false;
                }

            }            
        }

        return true;  
    }

    (function deleteMessage() {

        $(document).on('click', '.cancel_message', function(){

            $(this).parent().css("display", "none");
        });
    })();

    function checkLogIn() {

        let username = $('#login_in-username').val().replace(/\s/g, '');
        let password = $('#login_in-password').val().replace(/\s/g, '');
        
        var filtered = filterUsersValue({username: username, password: password});

        if(filtered) {

            sendToAjax('checkLogIn', {username: username, password: password}, function(data) {
                
                if(data.value) {

                    location.assign("home");

                } else {

                    $('.messages-container').append(`<div class="error_message">
                                                <i class="icon-attention"></i> 
                                                Can't log in. Check your username or password.
                                                <i class="icon-cancel-circled cancel_message"></i>
                                            </div>`);
                }
            });

        } else {

            $('.messages-container').append(`<div class="error_message">
                                                <i class="icon-attention"></i> 
                                                Introduced forbidden data. Correct your fields.
                                                <i class="icon-cancel-circled cancel_message"></i>
                                            </div>`);
        }
    }

    function checkSignUp() {

        let password = $('#sign_up-password').val();
        let repeatpassword = $('#sign_up-repeatpassword').val();
        
        if(password !== repeatpassword) {

            console.log('podane hasla sa rozne');
            return false;
        }

        let username = $('#sign_up-username').val().replace(/\s/g, '');
        let email = $('#sign_up-email').val().replace(/\s/g, '');
        password = password.replace(/\s/g, '');
        repeatpassword = repeatpassword.replace(/\s/g, '');

        var filtered = filterUsersValue({username: username, email: email, password: password});

        if(filtered) {

            sendToAjax('checkSignUp', {username: username, email: email, password: password, repeatpassword: repeatpassword}, function(data){

                if(data.value) {

                    console.log('uzytkownik utworzony');
                } else {

                    $('.messages-container').append(`<div class="error_message">
                                                        <i class="icon-attention"></i> 
                                                        User with this name or email is already created.
                                                        <i class="icon-cancel-circled cancel_message"></i>
                                                    </div>`);
                }
            });

        } else {

            $('.messages-container').append(`<div class="error_message">
                                                <i class="icon-attention"></i> 
                                                Introduced forbidden data. Correct your fields.
                                                <i class="icon-cancel-circled cancel_message"></i>
                                            </div>`);
        }
    }
});