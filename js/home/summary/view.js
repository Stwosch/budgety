const viewSummary = (() => {

    const DOMstrings = {
        addDateBtn: '#add-btn-start',
        nameInput: '.add-name',
        monthInput: '.add-month',
        yearInput: '.add-year',
        summaryTable: '.table-data tbody',
        budgetAllMonthsSum: '.budget-summarized-value',
        budgetAllMonthsInc: '.budget-income .budget-value',
        budgetAllMonthsExp: '.budget-expenses .budget-value',
        messagesContainer: '.messages-container',
        cancelMessage: '.cancel_message',
        username: '.user_name',
        table: '.table-data',
        tableRecord: '.table-record',
        deleteBtn: '.delete_items',
        sortBtn: '.sort-btn',
        sortType: '.sort-type'
    };

    function monthInWords(m) {

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[m-1];
    }

    function formatNumber(num) {

        if(num > 0) { type = 'inc'; } 
        else { type = 'exp'; }

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

        if(parseFloat(num) === 0) { return int + '.' + dec };

		return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
	}

    function bindItem(obj, index) {

        let html = "", template = `
            <tr class="table-record %class%" id="iddate_%iddate%">
                <td>%index%</td>
                <td>%date%</td>
                <td>%name%</td>
                <td>%income%</td>
                <td>%expenses%</td>
                <td>%sum%</td>
            </tr>
        `;

        html = template.replace('%index%', index);
        html = html.replace('%iddate%', obj.id);
        html = html.replace('%date%', monthInWords(obj.month) + ' ' +  obj.year);
        html = html.replace('%name%', obj.name);
        html = html.replace('%income%', formatNumber(obj.valueInc));
        html = html.replace('%expenses%', formatNumber(obj.valueExp));
        html = html.replace('%sum%', formatNumber(obj.valueExp + obj.valueInc));
        html = html.replace('%class%', obj.valueExp + obj.valueInc >= 0 ? 'plus' : 'minus');

        return html;
    }

    return {

        getInputs: () => {
			return {
				name: $(DOMstrings.nameInput).val().trim(),
                month: parseInt($(DOMstrings.monthInput).val()),
                year: parseInt($(DOMstrings.yearInput).val())
			}
		},

        displayMessage: message => {
            $(DOMstrings.messagesContainer).append(`<div class="error_message">
                                                    <i class="icon-attention"></i> 
                                                        ${message}
                                                    <i class="icon-cancel-circled2 cancel_message"></i>
                                                </div>`);
        },

        deleteMessage: e => {
            e.target.parentNode.style.display = 'none'; 
        },

        clearInputs: () => {

            $(DOMstrings.nameInput).val("");
            $(DOMstrings.yearInput).val("");
        },

        displayBudgetInAllMonths: arr => {

            let inc = arr.reduce((lastVal, obj) => {
                return lastVal + obj.valueInc; 
            }, 0);

            let exp = arr.reduce((lastVal, obj) => {
                return lastVal + obj.valueExp; 
            }, 0);

            let sum = inc + exp;

            $(DOMstrings.budgetAllMonthsInc).html(formatNumber(inc));
            $(DOMstrings.budgetAllMonthsExp).html(formatNumber(exp));
            $(DOMstrings.budgetAllMonthsSum).html(formatNumber(sum));
        },

        getDOMstrings: () => DOMstrings,

        displayItems: arr => {

            $(DOMstrings.summaryTable).html("");

            let html, index = 1;

            for(let obj of arr) {

                html += bindItem(obj, index);
                index +=1;
            }

            $(DOMstrings.summaryTable).append(html);
        },

        displayUsername: name => {
            $(DOMstrings.username).html(name);
        },

        displayToDelete: id => {

            $('#' + id).toggleClass('toDelete');
        },

        clearTable: () => {
            $(DOMstrings.summaryTable).html("");
        }
    }
})();