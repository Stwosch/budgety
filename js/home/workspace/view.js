const viewWorkspace = (() => {

	const DOMstrings = {
		inputType: '.add-type',
		inputDescription: '.add-description',
		inputValue: '.add-value',
		inputBtn: '#add-btn-managment',
		incomeContainer: '.income-list',
		expensesContainer: '.expenses-list',
		budgetLabel: '.budget-summarized-value',
		incomeLabel: '.budget-income .budget-value',
		expenseLabel: '.budget-expenses .budget-value',
		percentageLabel: '.budget-expenses .budget-percentage',
		container: '.items_container',
		itemPercentage: '.item-percentage',
		dateLabel: '.budget-month',
		username: '.user_name'
	};

	function formatNumber(num, type) {

		num = Math.abs(num);
		num = num.toFixed(2);

		const numSplit = num.split('.');
		let dec = numSplit[1];
		let int = numSplit[0];

		if(int.length > 3) {

			for(let i = 3; i < int.length; i = i+4) {
				int = int.substr(0, int.length - i) + ',' + int.substr(int.length - i, int.length);
			}
		}

		return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
	};

	return {

		getInput: () => {
			return {
				type: $(DOMstrings.inputType).val(),
				description: $(DOMstrings.inputDescription).val(),
				value: parseFloat($(DOMstrings.inputValue).val())
			}
		},

		addListItem: (obj, type) => {

			let html, element;
			// 1. Create HTML placeholder

			if (type === 'inc') {

				element = DOMstrings.incomeContainer;

				html = `<div class="item" id="inc-%id%">
                            <div class="item-description">%description%</div>
                            <div class="item-value">%value%</div>
                            <button class="item-delete_btn icon-cancel-circled2"></button>
                        </div>`;
            }

            else if (type === 'exp') {

            	element = DOMstrings.expensesContainer;

            	html = `<div class="item" id="exp-%id%">
                            <div class="item-description">%description%</div>
                            <div class="item-value">%value%</div>
                            <button class="item-delete_btn icon-cancel-circled2"></i></button>
                            <div class="item-percentage">---</div>
                        </div>`;
            }

            // 2. Replace placeholder with data 

            html = html.replace('%id%', obj.id);
            html = html.replace('%description%', obj.description);
           	html = html.replace('%value%', formatNumber(obj.value, type));

            // 3. Insert the HTML into the DOM

            $(element).append(html);

		},

		deleteListItem: selectorID => $(`#${selectorID}`).remove(),

		clearFields: () => $(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`).val(""),

		displayPercentages: percentages => {

            const fields = $(DOMstrings.itemPercentage);

			for(let i = 0; i < fields.length; i++) {

                if(percentages[i] > 0) {

                    fields[i].textContent = percentages[i] + '%';

                } else { 
                    
                    fields[i].textContent = '---'; 	
                }	
			}

		},

		displayBudget: obj => {

			let type;

			if(obj.budget >= 0) type = 'inc';
			else type = 'exp';

			$(DOMstrings.budgetLabel).text(formatNumber(obj.budget, type));
			$(DOMstrings.incomeLabel).text(formatNumber(obj.totalInc, 'inc'));
			$(DOMstrings.expenseLabel).text(formatNumber(obj.totalExp, 'exp'));

			if(obj.percentage > 0)
				$(DOMstrings.percentageLabel).text(obj.percentage + '%');
			else 
				$(DOMstrings.percentageLabel).text('---');
		},

		displayDate: obj => {

			const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

			$(DOMstrings.dateLabel).html(months[obj.month - 1] + ' ' + obj.year + ' year');

		},

		changeTypeStyle: () => {

			$(DOMstrings.inputType + ',' + DOMstrings.inputDescription + ',' + DOMstrings.inputValue).toggleClass('red-focus');

			$(DOMstrings.inputBtn).toggleClass('red');
		},

		getDOMstrings: () => DOMstrings,

	};

})();