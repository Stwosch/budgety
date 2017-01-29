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
        <link href="css/home/css/style.css" rel="stylesheet">
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
                    <section class="budget_result">
                        <div class="budget">
                            <h2 class="budget-title">
                                Available Budget in <span class="budget-month">%Month%</span>:
                            </h2>
                            <div class="budget-summarized-value"></div>
                            <div class="budget-income">
                                <div class="budget-text">Income</div>
                                <div class="budget-value"></div>
                                <div class="budget-percentage">&nbsp;</div>
                            </div>
                            <div class="budget-expenses">
                                <div class="budget-text">Expenses</div>
                                <div class="budget-value"></div>
                                <div class="budget-percentage"></div>
                            </div>
                        </div>
                    </section>
                    <section class="budget_management">
                        <h2 hidden>Budget Managament</h2>
                        <div class="add">
                            <select class="add-type">
                                <option value="inc" selected>+</option>
                                <option value="exp">-</option>
                            </select>
                            <input type="text" class="add-description" placeholder="Add description">
                            <input type="number" class="add-value" placeholder="Value">
                            <button class="add-btn"><i class="icon-ok-circled2"></i></button>
                        </div>
                        <div class="items_container">
                            <div class="income">
                                <h2 class="income-title">Income</h2>
                                <div class="income-list"></div>
                            </div>
                            <div class="expenses">
                                <h2 class="expenses-title">Expenses</h2>
                                <div class="expenses-list"></div>
                            </div>
                        </div> 
                    </section>
                </main>
            </div>
        </div>
        <script src="js/jquery-3.1.1.min.js"></script>
        <script src="js/ajax.js"></script>
        <script src="js/app/budget.js"></script>
        <script src="js/app/userInterface.js"></script>
        <script src="js/app/router.js"></script>
        <script src="js/app/main.js"></script>
    </body>
</html>
';