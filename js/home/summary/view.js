const viewSummary = (() => {

    const DOMstrings = {
        addDateBtn: '#add-btn-start',
        nameInput: '.add-name',
        monthInput: '.add-month',
        yearInput: '.add-year',
        summaryTable: '.table-data tbody'
    };

    function monthInWords(m) {

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[m-1];
    }

    function bindItem(obj, index) {

        let html = "", template = `
            <tr class="%class%">
                <td>%index%</td>
                <td>%date%</td>
                <td>%name%</td>
                <td>%income%</td>
                <td>%expenses%</td>
                <td>%sum%</td>
            </tr>
        `;

        html = template.replace('%index%', index);
        html = html.replace('%date%', monthInWords(obj.month) + ' ' +  obj.year);
        html = html.replace('%name%', obj.name);
        html = html.replace('%income%', obj.valueInc > 0 ? '+ ' + obj.valueInc : obj.valueInc);
        html = html.replace('%expenses%', obj.valueExp);
        html = html.replace('%sum%', obj.valueExp + obj.valueInc > 0 ? '+ ' + (obj.valueExp + obj.valueInc) : obj.valueExp + obj.valueInc);
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
        
        clearInputs: () => {

            $(DOMstrings.nameInput).val("");
            $(DOMstrings.yearInput).val("");
        },

        getDOMstrings: () => DOMstrings,

        displayItems: arr => {

            let html, index = 1;

            for(let obj of arr) {

                html += bindItem(obj, index);
                index +=1;
            }

            $(DOMstrings.summaryTable).append(html);
        }
    }
})();