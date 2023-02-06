export function generate(length, lower, upper, punct, number) {
    let userPassword = "";
    let passwordCharSet = "";
    var lowercase = "abcdefghijklmnopqrstuvwxyz",
    uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers = "0123456789",
    punctuation = "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    plength;
    if (lower) {
        passwordCharSet += lowercase;
    }
    if (upper) {
        passwordCharSet += uppercase;
    }
    if (punct) {
        passwordCharSet += punctuation;
    }
    if (number) {
        passwordCharSet += numbers;
    }

    plength = Number(length);
    for (let i = 0; i < plength; i++) {
        userPassword += passwordCharSet.charAt(
        Math.floor(Math.random() * passwordCharSet.length)
        );
    }
    return userPassword;
}
