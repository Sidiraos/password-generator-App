function getRandomNumber(min , max) {
    let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
    randomNumber = randomNumber / 4294967296;
    return Math.trunc( randomNumber * (max - min + 1)) + min;
}


function addAset(fromCode , toCode){
 let characteresList = ""
 for (let i = fromCode ; i <= toCode ; i++){
    characteresList += String.fromCharCode(i);
 }

 return characteresList;
}

// 33 , 47 characteres
// 48 , 57 digitos
// 65 , 90 Uppercase letters
// 97 , 122 Lowercase letters
const charsSet = {
    lowercaseChars : addAset(97, 122) ,
    uppercaseChars : addAset(65, 90) ,
    numbers : addAset(48, 57),
    symbols : addAset(33, 47) + addAset(58, 64) + addAset(91,96) + addAset(123, 126)
}

console.log(charsSet);

const passwordContent = document.getElementById("pass");
const errorMsg = document.querySelector(".error-msg");
const generateBtn = document.getElementById("generateBtn");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const range = document.querySelector("input[type='range']");
const rangeValue = document.getElementById("sizeValue");

function handleRange(e){
    rangeValue.textContent = e.target.value;
}

generateBtn.addEventListener("click", createPassword)

function createPassword() {
    // size of the password field in the range field
    range.addEventListener("input", handleRange);
    let passwordLength = parseInt(range.value);

    // verify checkbox checked
    const checkedDataSets = checkedSets();

    if (!checkedDataSets.length) {
        errorMsg.textContent = "Au moins une chaîne sélectionnée";
        return
    } else errorMsg.textContent = "";

    // concat all the data sets in one item
    const concatenatedDataSets = checkedDataSets.reduce((acc,curr) => acc + curr);
    
    // create password
    let password = "";
    let passwordBase = [];

    for (let i = 0 ; i < checkedDataSets.length ; i++){
        passwordBase.push(checkedDataSets[i][getRandomNumber(0 , checkedDataSets[i].length -1)])
    }
    for (let i = checkedDataSets.length; i < passwordLength ; i++){
            password += concatenatedDataSets[getRandomNumber(0, concatenatedDataSets.length -1)];
    }

    passwordBase.forEach((item , index)=>{
        const randomIndex = getRandomNumber(0 , password.length);
        password = password.slice(0 , randomIndex) + passwordBase[index] + password.slice(randomIndex)

    })

    console.log(password);
    // input password changed to password value
    passwordContent.value = password;
 }

createPassword();


 function checkedSets() {
    const checkedSets = [];
    checkboxes.forEach(checkbox => checkbox.checked && checkedSets.push(charsSet[checkbox.id]) )
    return checkedSets;
 }

 console.log(checkedSets());

 const copyBtn = document.querySelector('#copyBtn')

 copyBtn.addEventListener('click', copyBtnClickHandler)

 function copyBtnClickHandler () {
    let textCopy = passwordContent.value;
    navigator.clipboard.writeText(textCopy).then(
        ()=> copied(),
        (error) => console.error('failed to copy password' , error)
    )
 }

 let lock = false;
 function copied(){
    if(lock) return;
    lock = true;
    console.log("passwords copied");
    document.querySelector('.copied').classList.add('showCopied');
    setTimeout(() => {
        document.querySelector('.copied').classList.remove('showCopied');
        lock = false;
    } , 1000)
 }