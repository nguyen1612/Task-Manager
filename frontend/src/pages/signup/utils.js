export function checkUsername(str) {
    return str.length > 6 && str.length < 30;
}

export function checkPassword(str) {
    return true;
}

export function checkConfirmPassword(str, data) {
    return str === data.input.Password.txt;
}

export function checkEmail(str) {
    return str.length < 255
}