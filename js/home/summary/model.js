const modelSummary = (() => {

    class SummaryBudget {

        constructor(options) {
            this.id = options.id;
            this.name = options.name;
			this.month = options.month;
			this.year = options.year;
            this.valueInc = options.valueInc;
            this.valueExp = options.valueExp;
		}
    }

    const data = {
        allItems: [],
        toDelete: []
    };

    function createObject(obj) {

        let newObj = {
            id: obj.id_date,
            month: obj.month,
            name: obj.name,
            year: obj.year
        }

        if(obj.type === 'inc') {
            newObj.valueInc = parseFloat(obj.value);
            newObj.valueExp = 0;
        } else {
            newObj.valueInc = 0;
            newObj.valueExp = parseFloat(obj.value) * (-1);
        }

        return new SummaryBudget(newObj);
    };

    function sumItems(obj, sumBudget) {

        if(obj.type === 'inc') {
            sumBudget.valueInc += parseFloat(obj.value);
        } else {
            sumBudget.valueExp -= parseFloat(obj.value);
        }
    }

    function iterateThroughAllItems(obj) {

        for(let sumBudget of data.allItems) {

            if(obj.month === sumBudget.month && obj.year === sumBudget.year) {

                sumItems(obj, sumBudget);
                return true;
            }
        }

        return false;
    }

    function addOneItem(obj) {

        if(obj.type === null && obj.value === null) {
            obj.type = 'inc';
            obj.value = 0;
        }

        if(!iterateThroughAllItems(obj)) {
            data.allItems.push(createObject(obj));
        }
    }

    return {

        addOneItem: addOneItem,

        loadItems: callback => {

            sendToAjax('summaryGetBudget', {sending: true}, callback);
        },

        addItems: arr => { 

             for(let obj of arr) {

                addOneItem(obj);                 
             }
        },

        clearAllItems: () => {
            data.allItems = [];
        },

        getAllItems: () => {
            return data.allItems;
        },

        checkInputs: obj => {

            if (obj.name === "" ||
                isNaN(obj.month) ||
                obj.month < 1 ||
                obj.month > 12 ||
                obj.year.toString().length !== 4) {
                    
                    return false;
            }

            return true;
        },

        saveDate: (obj, callback) => {

            sendToAjax('saveDate', obj, callback); 
        },

        loadUsername: callback => {
            sendToAjax('loadUsername', {sending: true}, callback);
        },

        addToDelete: id => {

            for(let savedID of data.toDelete) {

                if(savedID === id) {
                    data.toDelete.splice(savedID, 1);
                    return;
                }
            }

            data.toDelete.push(id);
        },

        getToDelete: () => data.toDelete,

        deleteItems: callback => {

            let ids = data.toDelete.map(currentVal => {
                let arr = currentVal.split('_');
                return arr[1];
            });

            sendToAjax('deleteDate', {values: ids}, callback);
        },

        clearToDelete: () => {
            data.toDelete = [];
        },

        sortItems: val => {

            let arr = val.split('/');

            switch(arr[0]) {

                case 'inc': 

                    data.allItems.sort((a, b) => {

                        if(arr[1] === 'l-h') { return a.valueInc - b.valueInc; } 
                        else { return b.valueInc - a.valueInc; }
                    });
                break;

                case 'exp':

                    data.allItems.sort((a, b) => {

                        if(arr[1] === 'l-h') { return a.valueExp - b.valueExp; } 
                        else { return b.valueExp - a.valueExp; }    
                    });
                break;

                case 'sum': 

                    data.allItems.sort((a, b) => {
                        let val1 = a.valueExp + a.valueInc;
                        let val2 = b.valueExp + b.valueInc;

                        if(arr[1] === 'l-h') { return val1 - val2; } 
                        else { return val2 - val1;}
                    });
                break;

                case 'date': 

                        data.allItems.sort((a, b) => {

                            if(arr[1] === 'l-h') {

                                if(a.year < b.year) { return -1; }
                                if(a.year > b.year) { return 1; }

                                if(a.month < b.month) { return -1; }
                                if(a.month > b.month) { return 1; }

                            } else {

                                if(a.year < b.year) { return 1; }
                                if(a.year > b.year) { return -1; }

                                if(a.month < b.month) { return 1; }
                                if(a.month > b.month) { return -1; }
                            }

                            return 0;
                        });
                break;

                case 'name': 

                    data.allItems.sort((a, b) => {

                        if(arr[1] === 'l-h') {

                            if(a.name < b.name) { return -1; }
                            if(a.name > b.name) { return 1; }
                        } else {

                            if(a.name < b.name) { return 1; }
                            if(a.name > b.name) { return -1; }
                        }

                        return 0;
                    });
                break;
            }
        }

    }
})();