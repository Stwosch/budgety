const dateSelector = (() => {

    const handlers = (() => {

        return {
            container: '.dates',
            button: '.dates-btn'
        }
    })();

    function events() {
        $(handlers.button).on('click', chooseBudget);
    }

    function chooseBudget(e) {

        e.preventDefault();
        location.hash = '#workspace';
        controllerWorkspace.init($(handlers.container).val());
    }

    function bindDate(arr) {

        let html, h, template = `
            <option value="%month%/%year%">
            %name% / 
            %monthInWords% 
            %year%
            </option>
        `;

        for(obj of arr) {

            h = template.replace('%monthInWords%', monthInWords(obj.month));
            h = h.replace('%month%', obj.month);
            h = h.replace(/%year%/g, obj.year);
            h = h.replace('%name%', obj.name);
            html += h;
        }

        $(handlers.container).append(html);
    }

    function monthInWords(m) {

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[m-1];
    }

    function setDate(data) {
        
        if(!data) {
            console.log('brak');
            return;
        } 

        bindDate(data);
    }

    function selectDate() {
        sendToAjax('dateSelector', {data: true}, setDate);
    }

    return {
        init: () => {
            selectDate();
            events();
        }
    };

})();