const controllerSummary = ((mdl, vw) => {

    function setupEventListeners() {
		
		const DOMstrings = vw.getDOMstrings();
		
		$(DOMstrings.addDateBtn).on('click', ctrlAddDate);
        $(DOMstrings.messagesContainer).on('click', DOMstrings.cancelMessage, vw.deleteMessage);
        $(DOMstrings.table).on('click', DOMstrings.tableRecord, ctrlToDelete);
        $(DOMstrings.deleteBtn).on('click', ctrlDeleteItems);
        $(DOMstrings.sortBtn).on('click', () => { ctrlSortItems($(DOMstrings.sortType).val()) });
	}

    function ctrlSetItems() {

       updateItems();
    }

    function updateItems() {

        mdl.clearAllItems();

        mdl.loadItems(data => {

            // Clear view
            vw.clearTable();
            // We haven't data
            if(!data) { return; }
            // 1. Create new items and add them to logic structure
            mdl.addItems(data);
            // 2. Get all items
            let allItems = mdl.getAllItems();
            // 3. Sort items
            mdl.sortItems('date/h-l');
            // 4. Display items for user
            vw.displayItems(allItems);
            // 5. Display budget in all months
            vw.displayBudgetInAllMonths(allItems);
            
        });
    }

    function ctrlSortItems(val) {

        let allItems = mdl.getAllItems();
        if(allItems.length < 2) { return; }

        mdl.sortItems(val);
        vw.displayItems(allItems);

    }

    function ctrlAddDate() {

        // 1. Get data from user
        let inputs = vw.getInputs();
        // 2. Check data from user
        if(!mdl.checkInputs(inputs)) { return; }
        
        mdl.saveDate(inputs, data => {

            if(data.value === 'exists') {
                vw.displayMessage('This date already exists');
            } else {
                let obj = {type: 'inc', value: 0, name: inputs.name, month: inputs.month, year: inputs.year};
                updateItems();
                vw.clearInputs();
            }
        });
    }

    function setUsername() {

        mdl.loadUsername(data => {
            
            vw.displayUsername(data.username);
        });
    }

    function ctrlToDelete(e) {

        let id = e.target.parentNode.id;

        mdl.addToDelete(id);
        vw.displayToDelete(id);
    }

    function ctrlDeleteItems(e) {

        e.preventDefault();

        let arr = mdl.getToDelete();
        if(arr.length < 1) { return; }

        mdl.deleteItems(data => {

            updateItems();
            mdl.clearToDelete();
        });
    }
    
    return {
        init: () => {
            setupEventListeners();
            ctrlSetItems();
        },

        setUsername: setUsername
    }

})(modelSummary, viewSummary);