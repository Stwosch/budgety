function router() {

    switch(location.hash) {

        case "#start":  $('main').html(Component.start);break;
        case "#managment": $('main').html(Component.managment); 
                            controller.init();
        break;
        
    }
}

router();

window.addEventListener("hashchange", () => router(), false);