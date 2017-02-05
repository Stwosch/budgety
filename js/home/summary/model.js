const modelSummary = (() => {

    class SummaryBudget {

        constructor(options) {
            this.name = options.name;
			this.month = options.month;
			this.year = options.year;
            this.valueInc = options.valueInc;
            this.valueExp = options.valueExp;
		}
    }

    const data = {
        allItems: []
    };

    function createObject(obj) {

        let newObj = {
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

    return {

        loadItems: callback => {

            sendToAjax('summaryGetBudget', {sending: true}, callback);
        },

        addItems: arr => { 

             for(let obj of arr) {

                 if(obj.type === null && obj.value === null) {
                    obj.type = 'inc';
                    obj.value = 0;
                }

                if(!iterateThroughAllItems(obj)) {
                    data.allItems.push(createObject(obj));
                }
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
        }

    }
})();