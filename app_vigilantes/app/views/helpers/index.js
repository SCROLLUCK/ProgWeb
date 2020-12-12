function upper (str) {
    return str.toUpperCase();
}
function lower (str) {
    return str.toLowerCase();
}

function checked (currnetValue, value){
    if (currnetValue == value) return "checked";
}

function printError(errors, campo){
    let message;
    if(errors){
        errors.errors.forEach(error => {
            if(error.path == campo){
                message = error.message;
            }
        });
    }
    return message;
}

module.exports = { upper , lower, checked, printError }