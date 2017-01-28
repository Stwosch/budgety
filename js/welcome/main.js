$(function(){

/*
*   === HANDLERS ===
*/
    const handlers = (() => {

        return {
            formSelection: $('.form_selection'),
            loginSelection: $('#login'),
            formLogin: $('.login'),
            formSignup: $('.signup'),
            field: $('.field'),
            loginUsername: $('#login_in-username'),
            loginPassword: $('#login_in-password'),
            loginBtn: $('#login_in-btn'),
            signupUsername: $('#sign_up-username'),
            signupEmail: $('#sign_up-email'),
            signupPassword: $('#sign_up-password'),
            signupRPPassword: $('#sign_up-repeatpassword'),
            signupBtn: $('#sign_up-btn'),
            guide: $('.guide'),
            guideContent: $('.guide-content'),
            btnHideGuide: $('.guide-back_btn'),
            messagesContainer: $('.messages-container')
        }
    })();

/*
*   === EVENTS ===
*/
    (() => {

        handlers.formSelection.click(changeMenu);
        handlers.field.focusout(checkValueImmediately);
        handlers.loginBtn.click(checkLogIn);
        handlers.signupBtn.click(checkSignUp);
        handlers.guide.click(changeGuide);
        handlers.btnHideGuide.click(changeGuide);
        handlers.messagesContainer.on('click', '.cancel_message', deleteMessage);
        
    })();

/*
* === FUNCTIONS ===
*/ 

    /*
    *   --- Change form and focus of header ---
    */

    function changeMenu() {

            // Focus of selection
            handlers.formSelection.removeClass('active');
            $(this).addClass('active');

            // Change form
            if (handlers.loginSelection.hasClass('active')) {

                handlers.formLogin.show();
                handlers.formSignup.hide();
            } else {

                handlers.formLogin.hide();
                handlers.formSignup.show();
            }

            handlers.guideContent.hide();
    }

    /*
    *   --- Show or hide guide that shows how to proper create account ---
    */

    function changeGuide() {

        if (handlers.formSignup.is(":visible")) {

            handlers.formSignup.hide();
            handlers.guideContent.show();
        } else {

            handlers.formSignup.show();
            handlers.guideContent.hide();
        }
        
    }

    /*
    *   --- Check values immediately ---
    */ 

    function checkValueImmediately() {

        let th = $(this);
        let value = th.val().trim();
        let type = th.attr('type');

        // filerUsersValue needs object as argument
        let obj = {};

        // Email has other validation than rest of values
        if(type === 'email') {

            obj.email = value;

        } else {

            obj.type = value;
        }

        if(!filterUsersValue(obj)) {

            th.addClass('field_error');

        } else {

            th.removeClass('field_error');
        }
    }

    /*
    *   --- Filter values from form ---
    */

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

    /*
    *   --- Delete messages ---
    */

    function deleteMessage() {

            $(this).parent().css("display", "none");
    }

   

    /*
    *   --- Check values and afterwards send to server, finally route to app or display message ---
    */

    function sendToServer(destination, message, obj) {

        sendToAjax(destination, obj, data => {

            if(data.value) {

                    location.assign("home");

                } else {

                    handlers.messagesContainer.append(`<div class="error_message">
                                                            <i class="icon-attention"></i> 
                                                            ${message}
                                                            <i class="icon-cancel-circled cancel_message"></i>
                                                        </div>`);
            }
        })
    }

    function checkLogIn(e) {

        e.preventDefault();
        let username = handlers.loginUsername.val().trim();
        let password = handlers.loginPassword.val().trim();
        let obj = {
                username: username, 
                password: password
        };
        
        let filtered = filterUsersValue(obj);

        if(filtered) {

            sendToServer('checkLogIn', "Can't log in. Check your username or password.", obj);

        } else {

            handlers.messagesContainer.append(`<div class="error_message">
                                                    <i class="icon-attention"></i> 
                                                    Introduced forbidden data. Correct your fields.
                                                    <i class="icon-cancel-circled cancel_message"></i>
                                                </div>`);
        }
    }

    function checkSignUp(e) {

        e.preventDefault();
        let password = handlers.signupPassword.val().trim();
        let repeatpassword = handlers.signupRPPassword.val().trim();
        
        if(password !== repeatpassword) {

            handlers.messagesContainer.append(`<div class="error_message">
                                                    <i class="icon-attention"></i> 
                                                    Passwords in the fields are different.
                                                    <i class="icon-cancel-circled cancel_message"></i>
                                                </div>`);
            return false;
        }

        let username = handlers.signupUsername.val().trim();
        let email = handlers.signupEmail.val().trim();
        let obj = {
            username: username, 
            email: email,
            password: password, 
            repeatpassword: repeatpassword
        }

        let filtered = filterUsersValue(obj);

        if(filtered) {

            sendToServer('checkSignUp', "User with this name or email is already created.", obj);

        } else {

            $('.messages-container').append(`<div class="error_message">
                                                <i class="icon-attention"></i> 
                                                Introduced forbidden data. Correct your fields.
                                                <i class="icon-cancel-circled cancel_message"></i>
                                            </div>`);
        }
    }
});