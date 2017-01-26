const budgetController = (() => {

	class Expense {

		constructor(id, description, value) {
			this.id = id;
			this.description = description;
			this.value = value;
			this.percentage = -1;
		}

		calcPercentage(totalIncome) {
			if(totalIncome > 0) this.percentage = Math.round(this.value / totalIncome * 100);
			else this.percentage = -1;
		}
	}

	class Income {

		constructor(id, description, value) {
			this.id = id;
			this.description = description;
			this.value = value;
		}
	}

	const data = {

		allItems: {
			exp: [],
			inc: []
		},

		totals: {
			exp: 0,
			inc: 0
		},

		budget: 0,

		percentage: -1

	};

	function calculateTotal(type) {

		let sum = 0;

		data.allItems[type].forEach(v => sum += v.value);

		data.totals[type] = sum;
	}

	return {
		addItem: (type, desc, val, id) => {

			let newItem;

			// 2. Create new instance of item
			if(type === 'exp')
				newItem = new Expense(id, desc, val);
			else if(type === 'inc')
				newItem = new Income(id, desc, val);

			// 3. Push item to data items array
			data.allItems[type].push(newItem);

			//4. Return new instance of item
			return newItem;
		},

		loadItem: (type, desc, val, id) => {

			let newItem;

			if(type === 'exp')
				newItem = new Expense(id, desc, val);
			else if(type === 'inc')
				newItem = new Income(id, desc, val);

			data.allItems[type].push(newItem);

			return newItem;
		},

		deleteItem: (type, id) => {

			const ids = data.allItems[type].map(v => v.id);
			const index = ids.indexOf(id);

			if(index !== -1) {
				data.allItems[type].splice(index, 1);
			}
		},

		calculateBudget: () => {

			// 1. Calculate total income and expenses

			calculateTotal('inc');
			calculateTotal('exp');

			// 2. Calculate the budget: income - expenses

			data.budget = data.totals.inc - data.totals.exp;

			// 3. Calculate the percentage of income that we spent 
			if(data.totals.inc > 0)
				data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
			else 
				data.percentage = -1;
		},

		calculatePercentage: () => {

			data.allItems.exp.forEach(v => v.calcPercentage(data.totals.inc));
		},

		getPercentages: () => {

			const allPerc = data.allItems.exp.map(v => v.percentage);
			return allPerc;
		},

		getBudget: () => {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			};
		}
	};

})();

const UIController = (() => {

	const DOMstrings = {
		inputType: '.add-type',
		inputDescription: '.add-description',
		inputValue: '.add-value',
		inputBtn: '.add-btn',
		incomeContainer: '.income-list',
		expensesContainer: '.expenses-list',
		budgetLabel: '.budget-summarized-value',
		incomeLabel: '.budget-income .budget-value',
		expenseLabel: '.budget-expenses .budget-value',
		percentageLabel: '.budget-expenses .budget-percentage',
		container: '.items_container',
		itemPercentage: '.item-percentage',
		dateLabel: '.budget-month'
	};

	function formatNumber(num, type) {

		num = Math.abs(num);
		num = num.toFixed(2);

		const numSplit = num.split('.');
		let int = numSplit[0];
		const dec = numSplit[1];

		if(int.length > 3) {

			for(let i = 3; i < int.length; i = i+4) {
				int = int.substr(0, int.length - i) + ',' + int.substr(int.length - i, int.length);
			}
		}

		return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
	};

	function nodeListForEach(list, fn) {

		for(let i = 0; i < list.length; i++) {
			fn(list[i], i);
		}
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

			let html, newHtml, element;

			// 1. Create HTML placeholder

			if(type === 'inc') {

				element = DOMstrings.incomeContainer;

				html = `<div class="item" id="inc-%id%">
                            <div class="item-description">%description%</div>
                            <div class="item-value">%value%</div>
                            <button class="item-delete_btn icon-cancel-circled2"></button>
                        </div>`;
            }

            else if(type === 'exp') {

            	element = DOMstrings.expensesContainer;

            	html = `<div class="item" id="exp-%id%">
                            <div class="item-description">%description%</div>
                            <div class="item-value">%value%</div>
                            <button class="item-delete_btn icon-cancel-circled2"></i></button>
                            <div class="item-percentage">21%</div>
                        </div>`;
            }

            // 2. Replace placeholder with data 

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            // 3. Insert the HTML into the DOM

            $(element).append(newHtml);

		},

		deleteListItem: selectorID => {

			$(`#${selectorID}`).remove();
		},

		clearFields: () => {

			$(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`).val("");

		},

		displayPercentages: percentages => {

			var fields = $(DOMstrings.itemPercentage);


			for(let i = 0; i < fields.length; i++) {

				((fields, i) => {

					if(percentages[i] > 0) fields.textContent = percentages[i] + '%';
					else fields.textContent = '---'; 
					
				})(fields[i], i);
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

		displayDate: () => {

			const date = new Date();

			const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

			const month = date.getMonth();
			const year = date.getFullYear();

			$(DOMstrings.dateLabel).text(months[month] + ' ' + year);

		},

		changeTypeStyle: () => {

			$(DOMstrings.inputType + ',' + DOMstrings.inputDescription + ',' + DOMstrings.inputValue).toggleClass('red-focus');

			$(DOMstrings.inputBtn).toggleClass('red');
		},

		getDOMstrings: () => DOMstrings
		
	};

})();

const controller = ((budgetCtrl, UICtrl) => {

	function setupEventListeners() {
		
		const DOMstrings = UICtrl.getDOMstrings();

		// Add item on click button
		$(DOMstrings.inputBtn).on('click', ctrlAddItem);
		// Add item on press enter
		$(window).keypress(e => { if(e.keypress === 13 || e.which === 13) ctrlAddItem(); });
		// Delete item on click button
		$(DOMstrings.container).on('click', ctrlDeleteItem);
		// Change type while changing select field
		$(DOMstrings.inputType).change(UICtrl.changeTypeStyle);
	}

	function updateBudget() {

		// 1. Calculate budget
		budgetCtrl.calculateBudget();
		// 2. Return the budget
		const budget = budgetCtrl.getBudget();
		//5. Display budget on the UI
		UICtrl.displayBudget(budget);
	}

	function updatePercentages() {

		// 1. Calculate percentages
		budgetCtrl.calculatePercentage();
		// 2. Return percentages from the budget controller
		const percentages = budgetCtrl.getPercentages();
		// 3. Display updated budget
		UICtrl.displayPercentages(percentages);
	}

	function ctrlAddItem() {

		// 1. Get input values from user
		const input = UICtrl.getInput();

		if(input.description !== "" && !isNaN(input.value) && input.value > 0) {

			sendToAjax('saveBudget', {type: input.type, description: input.description, value: input.value}, function(data) {

				// 2. Create new instance of item and adds to data budget controller
				const newItem = budgetCtrl.addItem(input.type, input.description, input.value, data.id);
				// 3. Add item to the UI
				UICtrl.addListItem(newItem, input.type);
				// 4. Clear fields
				UICtrl.clearFields();
				// 5. Update budget
				updateBudget();
				// 6. Calculate and update percentages
				updatePercentages();

			});
		}
	}

	function ctrlDeleteItem(e) {

		let splitID, type, ID;
		const itemID = e.target.parentNode.id;

		if(itemID.substr(0,3) === 'inc' || itemID.substr(0,3) === 'exp') {

			splitID = itemID.split('-');
			type = splitID[0];
			ID = parseInt(splitID[1]);

			// 1. Delete the item from the data structure
			budgetCtrl.deleteItem(type, ID);
			// 2. Delete the item from the UI
			UICtrl.deleteListItem(itemID);
			// 3. Update and show the new budget
			updateBudget();
			// 6. Calculate and update percentages
			updatePercentages();
		}
	}

	function setBudget() {

			// 1. We send ajax in order select values from database
			 sendToAjax('selectBudget', {}, data => {

			 	for(obj of data) {

				 	let newItem = budgetCtrl.loadItem(obj.type, obj.description, parseFloat(obj.value), obj.id_item);
				 	UICtrl.addListItem(newItem, obj.type);
				 	updateBudget();
				 	updatePercentages();
				 }

			 });
	}
	
	return {
		init: () => {
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			});
			setBudget();			
			setupEventListeners();
			UICtrl.displayDate();
		}
	};
	

})(budgetController, UIController);

controller.init();