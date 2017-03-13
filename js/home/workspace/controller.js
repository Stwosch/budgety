const controllerWorkspace = ((mdl, vw) => {

	function setupEventListeners() {
		
		const DOMstrings = vw.getDOMstrings();
		
		// Add item on click button
		$(DOMstrings.inputBtn).on('click', ctrlAddItem);
		// Add item on press enter
		$(window).keypress(e => { if(e.keypress === 13 || e.which === 13) ctrlAddItem(); });
		// Delete item on click button
		$(DOMstrings.container).on('click', ctrlDeleteItem);
		// Change type while changing select field
		$(DOMstrings.inputType).change(vw.changeTypeStyle);
	}

	function updateBudget() {

		// 1. Calculate budget
		mdl.calculateBudget();
		// 2. Return the budget
		let budget = mdl.getBudget();
		//5. Display budget on the UI
		vw.displayBudget(budget);
	}

	function updatePercentages() {

		// 1. Calculate percentages
		mdl.calculatePercentage();
		// 2. Return percentages from the budget controller
		let percentages = mdl.getPercentages();
		// 3. Display updated budget
		vw.displayPercentages(percentages);
	}

	function ctrlAddItem() {

		// 1. Get input values from user
		let input = vw.getInput();

		if (input.description === "" || isNaN(input.value) || input.value < 0) return;

		// 2. Get value from dates
		let obj = mdl.getYMdate();

		mdl.saveBudget({type: input.type, description: input.description, value: input.value, month: obj.month, year: obj.year}, data => {

			// 3. Create new instance of item and adds to data budget controller
			
			let newItem = mdl.addItem({type: input.type, description: input.description, value: input.value, id_item: data.id_item});
			// 4. Add item to the UI
			vw.addListItem(newItem, input.type);
			// 5. Clear fields
			vw.clearFields();
			// 6. Update budget
			updateBudget();
			// 7. Calculate and update percentages
			updatePercentages();
		});
	}

	function ctrlDeleteItem(e) {

		let splitID, type, ID;
		const itemID = e.target.parentNode.id;

		if(itemID.substr(0,3) === 'inc' || itemID.substr(0,3) === 'exp') {

			splitID = itemID.split('-');
			type = splitID[0];
			ID = parseInt(splitID[1]);

			// 1. Delete the item from the data structure
			mdl.deleteItem(type, ID);
			// 2. Delete the item from the UI
			vw.deleteListItem(itemID);
			// 3. Update and show the new budget
			updateBudget();
			// 6. Calculate and update percentages
			updatePercentages();
			// 7. Delete item from database
			mdl.deleteItemDB(ID);
		}
	}

	function ctrlSetBudget(date) {

			let obj = mdl.setYMdate(date);

			mdl.loadBudget(obj, data => {

				data.value = parseFloat(data.value);
				data.id_item = parseInt(data.id_item);

				let newItem = mdl.addItem(data);
				vw.addListItem(newItem, data.type);
				updateBudget();
				updatePercentages();
			}, 
			vw.displayBudget,
			() => {
				setupEventListeners();
				vw.displayDate(obj);
			});
	}

	return {
		init: date => {
			mdl.clearAllItems();
			ctrlSetBudget(date);
		}
	};
	

})(modelWorkspace, viewWorkspace);


