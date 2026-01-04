import { logout, onAuthChange } from "./auth.js";

const topMenu = document.getElementById("topmenu_ul");

onAuthChange(async (user) => {
    if (!user) {
        showLogin();
    } else {
        showLogOut();
    }


})

const showLogin = () => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="signin.html">Login</a>`;
    topMenu.appendChild(li);
}

const showLogOut = () => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="cook_book.html">Cook book</a>`;
    const logOutLi = document.createElement("li");
    logOutLi.innerHTML = `<a href="#" id="logout">Logout</a>`;

    topMenu.appendChild(li);
    //topMenu.appendChild(logOutLi);
    //const logoutLink = topMenu.querySelector("logout");

    /*logoutLink.addEventListener('click', async () => {
        try {
            await logout();
        }
        catch (error) {
            console.error("Logout failed", error);
            messageDiv.textContent = "Logout failed: " + error.message;
        }
    })*/

}