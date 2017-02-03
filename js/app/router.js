function route() {

    switch(location.hash) {

        case "#start":  $('main').html(Component.start);
        break;

        case "#managment": $('main').html(Component.managment); 
            controller.init();
        break;
            
    }
}

window.addEventListener("hashchange", () => route(), false);
route();





