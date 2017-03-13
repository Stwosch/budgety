const Component = {
    
workspace : `
<section class="background-managment">
    <div class="budget">
        <h1 class="budget-title">
            Available Budget in <span class="budget-month">%Month%</span>:
        </h1>
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
        <button class="add-btn" id="add-btn-managment"><i class="icon-ok-circled2"></i></button>
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
`,

start : `
    <section class="background-start">
        <div class="budget">
            <h1 class="budget-title">Available Budget in all months</h1>
            <div class="budget-summarized-value">+ 0.00</div>
            <div class="budget-income">
                <div class="budget-text">Income</div>
                <div class="budget-value">+ 0.00</div>
            </div>
            <div class="budget-expenses">
                <div class="budget-text">Expenses</div>
                <div class="budget-value">- 0.00</div>
            </div>
        </div>
    </section>
    <section>
        <div class="add">
            <input type="text" class="add-name" placeholder="Add name">
            <select class="add-month">
                <option value="1" selected>January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            <input type="number" class="add-year" placeholder="Year">
            <button class="add-btn" id="add-btn-start"><i class="icon-ok-circled2"></i></button>
        </div>
    </section>
    <section class="table-options">
        <button type="submit" class="delete_items button button-modifier_red">Delete</button>
        <div class="sort">
            <select class="sort-type select">
                <option value="date/h-l">Date: New to Old</option>
                <option value="date/l-h">Date: Old to New</option>
                <option value="name/l-h">Name: A-Z</option>
                <option value="name/h-l">Name: Z-A</option>
                <option value="inc/l-h">Inc: Low to High</option>
                <option value="inc/h-l">Inc: High to Low</option>
                <option value="exp/l-h">Exp: Low to High</option>
                <option value="exp/h-l">Exp: High to Low</option>
                <option value="sum/l-h">Sum: Low to High</option>
                <option value="sum/h-l">Sum: High to Low</option>
            </select>
            <button type="submit" class="sort-btn button button-modifier_blue">Sort</button>
        </div>
    </section>
    <section>
        <table class="table-data">
            <thead>
                <th>#</th>
                <th>Date</th>
                <th>Name</th>
                <th>Income</th>
                <th>Expenses</th>
                <th>Sum</th>
            </thead>
            <tbody>
            </tbody>
        </table>
    </section>
`,

managment: `
    <div class="date_selector">
        <h2>Choose date</h2>
        <form>
            <select class="select dates"></select>
            <button type="submit" class="dates-btn button button-modifier_green">Choose</button>
        </form>
    </div>
`

};