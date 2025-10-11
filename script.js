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


document.addEventListener('DOMContentLoaded', () => {
    fetch('./data.json')
.then(res => {
    return res.json();
})
.then(data => {
    const extensionList = document.getElementById("extension-list");
    extensionList.innerHTML = data.map((item) => {
            return `<div
            class="text-neutral100 my-5 dark:text-neutral700 bg-neutral700 dark:bg-neutral0 p-4 rounded-lg flex flex-col gap-5">
            <div class="flex items-start gap-4">
              <img src="${item.logo}" />
              <div class="flex flex-col gap-2">
                <h2 class="font-bold text-[1.2rem]">${item.name}</h2>
                <p class="font-normal text-neutral300 text-[1.1rem] dark:text-neutral600">${item.description}</p>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <button class="border border-neutral600 py-2 px-3 rounded-r-4xl rounded-l-4xl">Remove</button>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" id="checkbox" ${item.isActive ? 'checked' : ''} data-index="${item.id}">
                <div class="w-10 h-5 rounded-full transition-colors bg-neutral600 ${item.isActive ? 'bg-red500' : 'bg-neutral600'}" id="circle"></div>
                <div class="absolute left-0 top-0 w-5 h-5 bg-neutral200 rounded-full transition-transform duration-300 ${item.isActive ? 'translate-x-5' : 'translate-x-0'}" id="circle"></div>
              </label>
            </div>
          </div>
            `
        }).join("")
        
})
.catch(error => console.error(error));
})



