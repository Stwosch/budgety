function sendToAjax(destination, value, callback) {

    function async() {

        return new Promise((resolve, reject) => {

            let val = $.post(destination, value);
            if(val != undefined) resolve(val);
            else reject('Error JavaScript');

        });
    };

    async().then( val => { let data = $.parseJSON(val); callback(data); }, err => console.log(err));
}