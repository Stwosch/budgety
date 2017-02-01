const Component = {
    
managment : `
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
            <div class="budget-summarized-value">+ 3.200</div>
            <div class="budget-income">
                <div class="budget-text">Income</div>
                <div class="budget-value">+ 300</div>
                <div class="budget-percentage">&nbsp;</div>
            </div>
            <div class="budget-expenses">
                <div class="budget-text">Expenses</div>
                <div class="budget-value">- 500</div>
                <div class="budget-percentage">32%</div>
            </div>
        </div>
    </section>
    <section>
        <div class="add">
            <input type="text" class="add-name" placeholder="Add name (optional)">
            <select class="add-month">
                <option value="jan" selected>January</option>
                <option value="feb">February</option>
                <option value="mar">March</option>
                <option value="apr">April</option>
                <option value="may">May</option>
                <option value="jun">June</option>
                <option value="jul">July</option>
                <option value="aug">August</option>
                <option value="sep">September</option>
                <option value="oct">October</option>
                <option value="nov">November</option>
                <option value="dec">December</option>
            </select>
            <input type="number" class="add-year" placeholder="Year">
            <button class="add-btn" id="add-btn-start"><i class="icon-ok-circled2"></i></button>
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
                <tr class="plus">
                    <td>1</td>
                    <td>21/01/2016</td>
                    <td>Budget 1</td>
                    <td>+ 1.500</td>
                    <td>- 100</td>
                    <td>+ 1.400</td>
                </tr>
                <tr class="plus">
                    <td>2</td>
                    <td>11/08/2016</td>
                    <td>My budget</td>
                    <td>+ 1.700</td>
                    <td>- 600</td>
                    <td>+ 1.100</td>
                </tr>
                <tr class="minus">
                    <td>3</td>
                    <td>01/01/2016</td>
                    <td>Budzeterinio</td>
                    <td>+ 30</td>
                    <td>- 11.000</td>
                    <td>- 10.970</td>
                </tr>
                <tr class="plus">
                    <td>4</td>
                    <td>23/02/2016</td>
                    <td>Budget 2</td>
                    <td>+ 11.000</td>
                    <td>- 450</td>
                    <td>+ 10.550</td>
                </tr>
                <tr class="minus">
                    <td>5</td>
                    <td>19/01/2016</td>
                    <td>Budgetto</td>
                    <td>+ 1.000</td>
                    <td>- 10.000</td>
                    <td>- 9.000</td>
                </tr>
            </tbody>
        </table>
    </section>
`

};