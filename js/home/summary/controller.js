const controllerSummary = ((mdl, vw) => {

    function setupEventListeners() {
		
		const DOMstrings = vw.getDOMstrings();
		
		$(DOMstrings.addDateBtn).on('click', ctrlAddDate);
	}

    function ctrlSetItems() {

        mdl.loadItems(data => {

            // We haven't data
            if(!data) { return; }
            
            // 1. Create new items and add them to logic structure
            mdl.addItems(data);
            // 2. Get all items
            let allItems = mdl.getAllItems();
            // 3. Display items for user
            vw.displayItems(allItems);

        });
    }

    function ctrlAddDate() {

        // 1. Get data from user
        let inputs = vw.getInputs();
        // 2. Check data from user
        if(!mdl.checkInputs(inputs)) { return; }
        
        mdl.saveDate(inputs, data => {

            if(data.value === 'exists') {
                console.log('Takie dane juz istnieja');
            } else {
                vw.clearInputs();
            }
        });
    }
    
    return {
        init: () => {
            mdl.clearAllItems();
            setupEventListeners();
            ctrlSetItems();
        }
    }

})(modelSummary, viewSummary);