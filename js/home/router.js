const router = (() => {

    const handlers = (function() {
        
        return {
            main: 'main'
        }
    })();

    function listeners() {
        window.addEventListener("hashchange", () => locations(), false);
    }

    function loadLocation(component, callback) {

        $(handlers.main).html(component);
        callback();
    }

    function locations() {
        switch(location.hash) {

            case "#start":  
                loadLocation(Component.start, controllerSummary.init);
            break;
            
            case "#managment": 
                loadLocation(Component.managment, dateSelector.init);
            break;
            
            case "#workspace": 
                loadLocation(Component.workspace, () => {});
            break;
            
        }
    }

    function checkLocations() {

        if(location.hash === '#workspace') {

            location.hash = '#managment';
        }
    }

    (function init() {

        locations();
        listeners();
        checkLocations();
    })();

})();



