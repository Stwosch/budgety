<?php

echo '
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Budgety App</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">
    </head>
    <body>
        <!--<a href="http://www.freepik.com/free-vector/money-video-game_939901.htm">Designed by Freepik</a>-->
        <main class="main">
            <section class="form_section flexboxes log_in active">
                <h2>Log in</h2>
                <input type="text" placeholder="Username" id="login_in-username">
                <input type="password" placeholder="Password" id="login_in-password">
                <button type="button" class="form_btn" id="login_in-btn">Log in</button>
                <a href="#">Forgotten your password?</a>
                <p class="change">Don\'t have an account? Sign up</p>
            </section>
            <section hidden class="form_section flexboxes sign_up">
                <h2>Sign up</h2>
                <input type="text" placeholder="Username" id="sign_up-username">
                <input type="email" placeholder="E-mail" id="sign_up-email">
                <input type="password" placeholder="Password" id="sign_up-password">
                <input type="password" placeholder="Repeat Password" id="sign_up-repeatpassword">
                <button type="button" class="form_btn" id="sign_up-btn">Sign up</button>
                <a href="#">Forgotten your password?</a>
                <p class="change">Do you have an account? Log in</p>
            </section>
            <section class="info_section flexboxes">
                <header>
                    <h1 class="page-heading">Budgety App</h1>
                </header>
                <div class="info_section-wrapper">
                    <h2>Be sure your money!</h2>
                    <ul>
                        <li>Control your incomes and expenses</li>
                        <li>Compare revenues with other months</li>
                        <li>Lead your own savings calendar</li>
                    </ul>
                </div>
            </section>
        </main>
        <script src="js/jquery-3.1.1.min.js"></script>
        <script src="js/ajax.js"></script>
        <script src="js/main.js"></script>
    </body>
</html>
';
