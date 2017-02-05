const modelWorkspace = (() => {

	class Expense {

		constructor(options) {
			this.id = options.id;
			this.description = options.description;
			this.value = options.value;
			this.percentage = -1;
		}

		calcPercentage(totalIncome) {
			if(totalIncome > 0) this.percentage = Math.round(this.value / totalIncome * 100);
			else this.percentage = -1;
		}
	}

	class Income {

		constructor(options) {
			this.id = options.id;
			this.description = options.description;
			this.value = options.value;
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

	const YMdate = {
		month: 0,
		year: 0
	}

	function calculateTotal(type) {

		let sum = 0;
		data.allItems[type].forEach(v => sum += v.value);
		
		data.totals[type] = sum;
	}

	return {

		setYMdate: string => {

			let arr = string.split('/');

			YMdate.month = arr[0];
			YMdate.year = arr[1];

			return {
				month: arr[0],
				year: arr[1]
			}
		},

		getYMdate: () => {
			return YMdate;
		},

		addItem: obj => {

			let newItem;
			let newObj = {
				id: obj.id_item,
				description: obj.description,
				value: obj.value
			}

			// 1. Create new instance of item
			if(obj.type === 'exp') {

				newItem = new Expense(newObj);
			}
			else if(obj.type === 'inc') {

				newItem = new Income(newObj);
			}

			// 2. Push item to data items array
			data.allItems[obj.type].push(newItem);
			
			//3. Return new instance of item
			return newItem;
		},

		calculateBudget: () => {

			// 1. Calculate total income and expenses

			calculateTotal('inc');
			calculateTotal('exp');

			// 2. Calculate the budget: income - expenses

			data.budget = data.totals.inc - data.totals.exp;

			// 3. Calculate the percentage of income that we spent 
			if(data.totals.inc > 0) {
				data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
			}
			else {
				data.percentage = -1;
			}	
		},

		calculatePercentage: () => data.allItems.exp.forEach(v => v.calcPercentage(data.totals.inc)),

		deleteItem: (type, id) => {
			
			const ids = data.allItems[type].map(v => parseInt(v.id));
			const index = ids.indexOf(id);

			if(index !== -1) {
				data.allItems[type].splice(index, 1);
			}
		},

		deleteItemDB: id => sendToAjax('deleteItem', {id: id}, () => {}),

		getPercentages: () => data.allItems.exp.map(v => v.percentage),

		getBudget: () => {

			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			};
		},

		clearAllItems: () => {
			data.allItems.exp = [];
			data.allItems.inc = [];
		},

		loadBudget: (obj, callback, elseCallback, restCallbacks) => {

			sendToAjax('loadBudget', obj, data => {
				 
				 // IF statement is protection against data that doesn't contain any value,
				//  it's possible because users can don't have any values in database yet.
				if(data) {

					for(let obj of data) {
						callback(obj);
					}

				} else {
					elseCallback({
						budget: 0,
						totalInc: 0,
						totalExp: 0,
						percentage: -1
					});
				}		 
				
				restCallbacks();
			 });
		},

		saveBudget: (obj, callback) => sendToAjax('saveBudget', obj, data => callback(data))
	};

})();