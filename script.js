



function showSidebar(){
    const sidebar=document.querySelector('.my-menu-class');
    sidebar.style.display='flex';
}



function hideSideBar(){
    const hidebar=document.querySelector('.my-menu-class');
    hidebar.style.display='none';
}



// Add event listeners to menu items
document.querySelectorAll('.my-menu-class a').forEach(item => {
    item.addEventListener('click', () => {
        hideSideBar();
    });
});