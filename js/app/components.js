const Component = {
    
start : `
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
`,

managment : `
    <table>
        <td>
            <tr>wartosc1</tr>
            <tr>wartosc2</tr>
        </td>
    </table>
`

};