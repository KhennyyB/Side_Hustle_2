const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');
const menu_items = document.querySelectorAll('nav .mainMenu li a');


openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);

// close menu when you click on a menu item 
menu_items.forEach(item => {
    item.addEventListener('click',function(){
        close();
    })
})

function show(){
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}
function close(){
    mainMenu.style.top = '-100%';
}

//validation for inputs

let form = document.querySelector(".form");
let name = document.getElementById("user");
let email = document.getElementById("email");
let password = document.getElementById("password");
let pass = document.getElementById("password2");


//variable for displaying alert message
let isEmail = false;
let isUser = false;
let isPassword = false;
let isMatch = false;


form.addEventListener("submit",()=>{
	checkEmpty([name,email,pass,password]);
	checkLength(name,3,10);
	checkLength(password,8,15);
	checkMatch(password,pass);
	checkEmail(email);
	
	let message = document.querySelector(".display-pass");
	if(isEmail && isMatch && isPassword && isUser){
		message.style.top = "0";
		setTimeout(()=>{
			message.style.top ="-10%";
		},3000);
	}
})

//function to valid check email
fucntion checkEmail(input){
	let mail = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	let checking = mail.exec(input.value.trim());
	if(!checking){
			showError(input, "Email is not valid");
		}else{
			showPass(input);
			isEmail = true;
		}
}

//function to check password match
function checkMatch(pass1,pass2){
	if(pass1.value !== pass2.value){
		showError(pass2, '${grapInput(pass2)} didn't match');
	}else{
		isMatch = true;
	}
}

//function to check length
function checkLength(input,min,max){
	if(input.value.length > max){
		showError(input, '${grapInput(input)} must be smaller than ${max}.');
	}else if(input.value.length < min){
		showError(input, '${grapInput(input)} must be greater than ${min}.');
	}else{
		showPass(input);
		isPassword = true;
		isUser = true;
	}
}

function checkEmpty(input){
	input.forEach((item) =>{
		if(item.value.trim() === ""){
			showError(item, '${grapInput(item)} must be fill');
		}else{
			showError(item);
		}
	});
}

//captialize error message
function grapInput(input){
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//funtion to display error message
function showError(input,msg){
	let formItem = input.parentElement;
	formItem.className = "form-item fail";
	
	let span = formItem.querySelector("span");
	span.innerText = msg;
}

//function to make a showPass
function showPass(input){
	let forItem = input.parentElement;
	formItem.className = "form-item pass";
}
