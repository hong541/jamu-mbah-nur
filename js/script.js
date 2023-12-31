//toggle class active

const navbarNav = document.querySelector('.navbar-nav');
//ketika menu di klik

document.querySelector('#jamu-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};
//klik di luar sidebar untuk menghilangkan nav
const jamu = document.querySelector('#jamu-menu');

document.addEventListener('click', function(e) {
    if (!jamu.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});
