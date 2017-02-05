<?php

echo '
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Kalam" rel="stylesheet">
        <link href="css/home/fontello/css/fontello.css" rel="stylesheet">
        <link href="css/home/css/main/main.css" rel="stylesheet">
        <link href="css/home/css/start/start.css" rel="stylesheet">
        <link href="css/home/css/managment/managment.css" rel="stylesheet">
        <title>Budgety</title>
    </head>
    <body>
        <header class="masthead">
            <img src="img/budgety_logo.svg" alt="Logo" width="50" height="50">
            <div class="user_data">
                <span class="user_name"></span>
                <img class="user_image" src="img/placeholder-user.png" alt="User\'s photo">
            </div>
        </header>
        <div class="container">
            <div class="column_menu">
                <nav>
                    <ul>
                        <li>
                            <a href="#start">
                                <i class="icon-th-large"></i> Start
                            </a>
                        </li>
                        <li>
                            <a href="#managment">
                                <i class="icon-pencil"></i> Management
                            </a>
                        </li>
                        <li> 
                            <a href="logout">
                                <i class="icon-lock"></i> Log out
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="column_content">
                <main>
                </main>
            </div>
        </div>
        <script src="js/jquery-3.1.1.min.js"></script>
        <script src="js/ajax.js"></script>
        <script src="js/home/managment/dateSelector.js"></script>
        <script src="js/home/summary/model.js"></script>
        <script src="js/home/summary/view.js"></script>
        <script src="js/home/summary/controller.js"></script>
        <script src="js/home/workspace/model.js"></script>
        <script src="js/home/workspace/view.js"></script>
        <script src="js/home/workspace/controller.js"></script>
        <script src="js/home/components.js"></script>
        <script src="js/home/router.js"></script>
    </body>
</html>
';