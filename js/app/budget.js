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

		deleteItemDB: id => {

			sendToAjax('deleteItem', {id: id}, () => true);
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