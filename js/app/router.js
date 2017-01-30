function routerInit() {

    switch(location.hash) {

        case "#start":  $('main').html(Component.start); 
                        controller.init();
                        
        break;
        case "#managment": $('main').html(Component.managment); break;
        
    }
}

function router() {
alert('elo');
    switch(location.hash) {

        case "#start":  $('main').html(Component.start); 
                        
        break;
        case "#managment": $('main').html(Component.managment); break;
        
    }
}

routerInit();

window.addEventListener("hashchange", () => router(), false);