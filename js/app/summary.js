const summary = (() => {

    const handlers = (() => {

        return {
            startBtn: '#add-btn-start',
            nameInput: '.add-name',
            monthInput: '.add-month',
            yearInput: '.add-year',
            table: '.table-data tbody'
        }
            
    })();
    function events() {

        $(handlers.startBtn).on('click', ctrlDate);
    }

    function selectValues() {

        return {
            name: $(handlers.nameInput).val().trim(),
            month: parseInt($(handlers.monthInput).val()),
            year: parseInt($(handlers.yearInput).val())
        }
    }

    function checkValues(name, month, year) {
        
        if (name === "" ||
            isNaN(month) ||
            month < 1 ||
            month > 12 ||
            year.toString().length !== 4) {
                
                return false;
        }

        return true;
    }

    function clearInputs() {

        $(handlers.nameInput).val("");
        $(handlers.yearInput).val("");
    }

    function ctrlDate() {
        
        let inputs = selectValues();
        
        if (!checkValues(inputs.name, inputs.month, inputs.year)) {
            return;
        }
        
        sendToAjax('saveDate', {name: inputs.name, month: inputs.month, year: inputs.year}, data => {

            if(data.value === 'exists') {
                console.log('Takie dane juz istnieja');
            } else {
                clearInputs();
            }
            
        });
    }

    function loadValues() {

        sendToAjax('getAllUserBudget', {value: true}, ctrlLoadedValues);
    }

    function ctrlLoadedValues(data) {

        if(!data) {
            return;
        }
        
        let arr = sumValues(data);
        displayValues(arr);
    }

    function addValues(obj, newObj) {

        if(obj.type === 'inc') {
            newObj.valueInc += parseFloat(obj.value);
        } else {
            newObj.valueExp -= parseFloat(obj.value);
        }
    }

    function sumValues(arr) {

        let newArr = [];
        let checked = false;

        for(let obj of arr) {

            checked = false;

            if(obj.type === null && obj.value === null) {
                obj.type = 'inc';
                obj.value = 0;
            }

            for(let newObj of newArr) {

                if(obj.month === newObj.month && obj.year === newObj.year) {

                    addValues(obj, newObj);
                    checked = true;
                    break;
                }
            }

            if(!checked) {
                newArr.push(createObject(obj));
            }
        }

        return newArr;
    }

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

        return newObj;
    }

    function displayValues(arr) {

        let html, h, index=1, template = `
            <tr class="%class%">
                <td>%index%</td>
                <td>%date%</td>
                <td>%name%</td>
                <td>%income%</td>
                <td>%expenses%</td>
                <td>%sum%</td>
            </tr>
        `;

        for(obj of arr) {

            h = template.replace('%index%', index);
            h = h.replace('%date%', monthInWords(obj.month) + ' ' +  obj.year);
            h = h.replace('%name%', obj.name);
            h = h.replace('%income%', obj.valueInc > 0 ? '+ ' + obj.valueInc : obj.valueInc);
            h = h.replace('%expenses%', obj.valueExp);
            h = h.replace('%sum%', obj.valueExp + obj.valueInc > 0 ? '+ ' + (obj.valueExp + obj.valueInc) : obj.valueExp + obj.valueInc);
            h = h.replace('%class%', obj.valueExp + obj.valueInc >= 0 ? 'plus' : 'minus');
            html += h;
            index++;
        }

        $(handlers.table).append(html);

    }

    function monthInWords(m) {

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[m-1];
    }

    return {
        init: () => {
            events();
            loadValues();
        }
    }
})();