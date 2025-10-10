const darkMode = document.getElementById('darkMode');
const logoIcon = document.getElementById("logo");

darkMode.addEventListener('click', () => {
    document.documentElement.classList.toggle("dark");
    if(document.documentElement.classList.contains("dark")){
        darkMode.innerHTML = `
        <img src="./assets/images/icon-moon.svg" />
        `
        logoIcon.src = "./assets/images/logo.svg"
    } else {
        darkMode.innerHTML = `
        <img src="./assets/images/icon-sun.svg" />
        `
        logoIcon.src = "./assets/images/logo-dark.svg"
    }
})
