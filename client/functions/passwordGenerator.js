


 


function generate(length, lower, upper, punct, number) {
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
//   if (userPassword == "") {
//     let alertbox = document.getElementById('alert');
//     alertbox.innerHTML = "Please select an option before generating"
//     alertbox.classList.add('fail');
//     setTimeout(function(){ 
//     alertbox.classList.remove('fail');
//     }, 3000);

//   } else {
//     passwordFeild.innerHTML = userPassword;
//   }
//   copyButton.setAttribute("data-clipboard-text", userPassword)
// }


generateButton.addEventListener("click", generate);


 


clipboard.on('success', function(e) {


    console.info('Action:', e.action);


    console.info('Text:', e.text);


    console.info('Trigger:', e.trigger);


    let alertbox = document.getElementById('alert');


    alertbox.innerHTML = "Copied!"


    alertbox.classList.add('success');


    setTimeout(function(){ 


      alertbox.classList.remove('success');


    }, 3000);


    


    e.clearSelection();


});


 


clipboard.on('error', function(e) {


    console.error('Action:', e.action);


    console.error('Trigger:', e.trigger);


  let alertbox = document.getElementById('alert');


    alertbox.innerHTML = "Try select the text to copy"


    alertbox.classList.add('fail');


    setTimeout(function(){ 


      alertbox.classList.remove('fail');


    }, 3000);


});