import { signup, login, onAuthChange } from './auth.js';

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordConfInput = document.getElementById("conf_password");
const signupBtn = document.getElementById("signup");
const signinBtn = document.getElementById("login");
const messageDiv = document.getElementById("message");

const showMessage = (msg, isError = false) => {
    messageDiv.textContent = msg;
    messageDiv.style.color = isError ? 'red' : 'green';
}

if (signupBtn) {
    signupBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const email = emailInput.value;
        console.log(email);
        const password = passwordInput.value;
        const confirmPassword = passwordConfInput.value;
        console.log(password);
        console.log(confirmPassword);

        if (password === confirmPassword) {
            try {
                const user = await signup(email, password);
                showMessage("signup successful. Welcome " + user.email);
            }
            catch (error) {
                showMessage(error.message, true);
            }
        } else {
            showMessage("Password and Confirm password don't match. Please, try again", true);
        }
        //console.log("Sign Up Clicked!", email, password);


        //console.log(user);
    })
}

if (signinBtn) {
    signinBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            const user = await login(email, password);
            showMessage("Login successful. Welcome " + user.email);
        }
        catch (error) {
            showMessage(error.message, true);
        }
    })
}

onAuthChange(async (user) => {
    if (user) {
        window.location.href = "cook_book.html";
    }
})
