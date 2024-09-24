const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;
const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const Validation = {

    isValidPassword(input) {
        return input.match(passwordRegex)
    },
    isValidEmail(input) {
        return input.match(emailRegex)
    },
    isValidUsername(input) {
        return true;
    }

}

module.exports = Validation;