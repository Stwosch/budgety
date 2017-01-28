<?php

echo '
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Budgety</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
        <link href="css/welcome/fontello/css/fontello.css" rel="stylesheet">
        <link href="css/welcome/css/style.css" rel="stylesheet">
    </head>
    <body>
        <div class="messages-container"></div>
        <header class="page_header">
            <img src="img/budgety_logo.svg" alt="Logo" width="200">
            <h1 class="page_heading">budgety</h1>
        </header>
        <main>
            <div class="row">
                <div class="form_selection active" id="login"> 
                    <h2 tabindex="1">Log in</h2>
                </div>
                <div class="form_selection" id="signup">
                    <h2 tabindex="2">Sign up</h2>
                </div>
            </div>
            <form class="login">
                <div class="row">
                    <div class="fields-container">
                        <input type="text" placeholder="Username" class="field" id="login_in-username">
                        <label for="login_in-username">
                            <i class="icon-user"></i>    
                        </label> 
                    </div>
                </div>
                <div class="row">
                    <div class="fields-container">
                        <input type="password" placeholder="Password" class="field" id="login_in-password">
                        <label for="login_in-password">
                            <i class="icon-lock"></i>    
                        </label> 
                    </div>
                </div>
                <button type="submit" class="form_btn" id="login_in-btn">
                    <i class="icon-ok"></i>
                </button>
            </form>
            <form class="signup" hidden>
                <div class="row">
                    <div class="fields-container">
                        <input type="text" placeholder="Username" class="field" id="sign_up-username">
                        <label for="sign_up-username">
                            <i class="icon-user"></i>
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="fields-container">
                        <input type="email" placeholder="E-mail" class="field" id="sign_up-email">
                        <label for="sign_up-email">
                            <i class="icon-mail-alt"></i>
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="fields-container">
                        <input type="password" placeholder="Password" class="field" id="sign_up-password">
                        <label for="sign_up-password">
                            <i class="icon-lock"></i>
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="fields-container">
                        <input type="password" placeholder="Repeat Password" class="field" id="sign_up-repeatpassword">
                        <label for="sign_up-repeatpassword">
                            <i class="icon-lock"></i>
                        </label>
                    </div>
                </div>
                <button type="submit" class="form_btn" id="sign_up-btn">Get started</button>
                <a class="links guide">How to create account?</a>
            </form>
            <section class="guide-content" hidden>
                <h2 class="guide-header">How to proper create account?</h2>
                <p>You must remember that all fields except E-mail can contain only capital and small letters and numbers. White spaces are prohibited, but don\'t worry them in the start or end of the string.</p>
                <p>E-mail are consistent with international standard of regular expression, which covers 99.99% cases, but if you will help some problems, you can contact with us.</p>
                <button type="button" class="guide-back_btn">
                    Back<i class="icon-level-up"></i>
                </button>
            </section>
            <a class="links" href="#">Forgotten your password?</a>
            <a class="links" href="http://www.freepik.com/free-vector/blue-logo-of-letter-b_842921.htm">Designed by Freepik</a> 
        </main>
        <script src="js/jquery-3.1.1.min.js"></script>
        <script src="js/ajax.js"></script>
        <script src="js/welcome/main.js"></script>
    </body>
</html>
';
