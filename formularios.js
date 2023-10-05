const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () =>{
    container.classList.remove("right-panel-active");
});

class NewUser {
    constructor(id,name,surname,email,password, cargo = false){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.cargo = cargo;
    }
}

let Users = JSON.parse(localStorage.getItem('users')) || [];

const admin = {
    emailAdmin: "admin@reMate.com", 
    passwordAdmin:"reMate52i", 
    cargo: true};

const validateEmail = (email) => {
    const emailR = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailR.test (email);
};

const validatePassword = (password) => {
    return password.length >= 8;
};

const registro = (event) => { 
    event.preventDefault();
    let id = new Date().getTime();
    const name = document.querySelector ('#name').value.toUpperCase();
    const surname = document.querySelector ('#surname').value.toUpperCase();
    const email = document.querySelector ('#email').value;
    const password = document.querySelector ('#password').value;
    const checkbox_terminos = document.querySelector ('#checkbox_terminos');
    const isUserRegistered = Users.find (user => user.email === email);
    if(isUserRegistered){
        return alert ('El correo electrónico ya está asociado a una cuenta');
    }
    if (!validateEmail(email)){
        return alert('Por favor, ingresa un correo electrónico válido');
    }
    if (!validatePassword(password)){
        return alert ('La contraseña debe contener al menos 8 caracteres');
    }
    if (!checkbox_terminos.checked){
        return alert ('Por favor, confirma que estas de acuerdo con nuestros términos y condiciones');
    }
    let usuario = new NewUser(id, name, surname, email, password, cargo = false);
    Users.push(usuario);
    localStorage.setItem("users", JSON.stringify(Users));
    alert ('Ahora sos parte de nuestra comunidad matera!');
    window.location.href = '/formularios.html';
    document.querySelector ('#name').value = "";
    document.querySelector ('#surname').value = "";
    document.querySelector ('#email').value = "";
    document.querySelector ('#password').value = "";
}
    
const login = (event) => {
    event.preventDefault();
    const emailLogin = document.querySelector ('#emailLogin').value;
    const passwordLogin = document.querySelector ('#passwordLogin').value;
    if (emailLogin === admin.emailAdmin && passwordLogin === admin.passwordAdmin) {
        alert('Bienvenido a la administración de Re-Mate! 😎');
        localStorage.setItem('login_success', JSON.stringify(admin));
        window.location.href = '/pages/admin.html';
        return;
    }
    const validUser = Users.find (user => user.email === emailLogin && user.password === passwordLogin);
    if (!validUser){
        return alert ('El usuario o la contraseña son invalidos');
    } 
    alert (`Hola ${validUser.name}! Que bueno verte por aqui! 🧉`);
    localStorage.setItem('login_success', JSON.stringify(validUser));
    window.location.href = '/index.html';
    if (!validateEmail(emailLogin)){
        return alert ('Por favor, ingresa un correo electrónico válido');
    }
};
