const extensionList = document.getElementById('extension-list');
const filterBtnContainer = document.getElementById('filter-btn');
const filterBtns = document.querySelectorAll('.buttons');
const darkbutton = document.getElementById('darkMode');


darkbutton.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    if(document.documentElement.classList.contains("dark")){
        document.getElementById("logo").src = './assets/images/logo.svg';
        document.getElementById("image").src = './assets/images/icon-moon.svg'
  } else {
        document.getElementById("logo").src = './assets/images/logo-dark.svg';
        document.getElementById("image").src = './assets/images/icon-sun.svg'
  }
})




let extensionsData = [];
let currentFilter = 'all';

async function fetchExtensions(){
    const response = await fetch('data.json');
    extensionsData = await response.json();
    applyFilter(currentFilter);
}
function displayExtension(extensions){
    extensionList.innerHTML = '';


    extensions.forEach((extension) => {
        extensionList.innerHTML += 
        `
        <div
            class="text-neutral100 max-md:my-5 dark:text-neutral700 bg-neutral700 dark:bg-neutral0 p-4 rounded-lg flex flex-col justify-around gap-5 item" data-name="${extension.name}">
            <div class="flex items-start gap-4">
              <img src="${extension.logo}" />
              <div class="flex flex-col gap-2">
                <h2 class="font-bold text-[1.2rem]">${extension.name}</h2>
                <p class="font-normal text-neutral300 text-[1.1rem] dark:text-neutral600">${extension.description}</p>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <button class="border border-neutral600 py-2 px-3 rounded-r-4xl rounded-l-4xl remove-btn">Remove</button>
              <label class="relative inline-flex items-center cursor-pointer" for="checkbox-${extension.name}">
                <input type="checkbox" class="sr-only peer toggle-input" id='checkbox-${extension.name}' ${extension.isActive ? 'checked' : ''} data-index="${extension.id}">
                <div class="w-10 h-5 rounded-full transition-colors bg-neutral600 peer-checked:bg-red500"></div>
                <div class="absolute left-0 top-0 w-5 h-5 bg-neutral200 rounded-full transition-transform duration-300 translate-x-0 peer-checked:translate-x-5"></div>
              </label>
            </div>
          </div> 
        `
    })
}

function applyFilter(filter){
    currentFilter = filter;

    filterBtns.forEach(btn => {
        btn.classList.toggle("bg-red400", btn.id === filter);
        btn.classList.toggle("dark:bg-red500", btn.id === filter);
        btn.classList.toggle("dark:text-neutral100", btn.id === filter)
        btn.classList.toggle("text-neutral700", btn.id === filter);
    })


    let filteredData
    switch(filter){
        case "all":
            filteredData = extensionsData;
            break;
        case "active":
            filteredData = extensionsData.filter(ext => ext.isActive)
            break;
        case "Inactive":
            filteredData = extensionsData.filter(ext => !ext.isActive);
            break;
    }

    displayExtension(filteredData);
}

//Event handlers 
filterBtnContainer.addEventListener("click", handleFilterClick);
extensionList.addEventListener('click', handleGridClick);
extensionList.addEventListener("change", handleToggle);


function handleFilterClick(e){
    if(e.target.classList.contains('buttons')){
        applyFilter(e.target.id)
    }
}

function handleGridClick(e){
    if(e.target.classList.contains('remove-btn')){
        const item = e.target.closest(".item");
        console.log(item);
        const name = item.dataset.name;

        extensionsData = extensionsData.filter(ext => ext.name !== name);
        applyFilter(currentFilter);
    }
}

function handleToggle(e){
    if(e.target.classList.contains("toggle-input")){
        const item = e.target.closest(".item");
        const name = item.dataset.name;

        const extension = extensionsData.find(ext => ext.name === name);
        if(extension){
            extension.isActive = e.target.checked;
        }
    }
}

fetchExtensions();


{/*  */}