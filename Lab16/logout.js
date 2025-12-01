import { signout } from './auth.js';

const logoutBtn = document.getElementById("logout");
const initLogoutButton = () => {

    logout.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            const user = await signout();
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000)

        }
        catch (error) {
            console.log(error);
        }
    });

}

logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    console.log("sign out click");
    try {
        const user = await signout();
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000)

    }
    catch (error) {
        console.log(error);
    }
});