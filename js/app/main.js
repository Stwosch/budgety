
const controller = ((budgetCtrl, UICtrl) => {

	function setupEventListeners() {
		
		const DOMstrings = UICtrl.getDOMstrings();

		// Add item on click button
		DOMstrings.inputBtn.on('click', ctrlAddItem);
		// Add item on press enter
		$(window).keypress(e => { if(e.keypress === 13 || e.which === 13) ctrlAddItem(); });
		// Delete item on click button
		DOMstrings.container.on('click', ctrlDeleteItem);
		// Change type while changing select field
		DOMstrings.inputType.change(UICtrl.changeTypeStyle);
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
			// 7. Delete item from database
			budgetCtrl.deleteItemDB(ID);
		}
	}

	function setBudget() {

			// 1. We send ajax in order select values from database
			 sendToAjax('selectBudget', {}, data => {
				 
				 if(data) {

					 for(obj of data) {

						let newItem = budgetCtrl.loadItem(obj.type, obj.description, parseFloat(obj.value), obj.id_item);
						UICtrl.addListItem(newItem, obj.type);
						updateBudget();
						updatePercentages();
					}
				 }

			 });
	}

	function setUsername() {

		sendToAjax('selectUsername', {}, data => {

			UICtrl.setUsername(data.username);
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
			setUsername();
			UICtrl.displayDate();
		}
	};
	

})(budgetController, UIController);

controller.init();