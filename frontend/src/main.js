import { initUsersCrud } from './components/UsersList.js';
import { initStudentsList } from './components/StudentsList.js';
import { mountIcons } from './utils/icons.js';

const app = document.getElementById('app');
const pageTitle = document.getElementById('pageTitle');
const navLinks = document.querySelectorAll('.nav-link[data-view]');

const titles = {
    home: 'Dashboard',
    users: 'Usuarios',
    students: 'Estudiantes',
};
function setActiveLink(view) {
    navLinks.forEach(link => {
        const isActive = link.dataset.view === view;
        link.classList.toggle('bg-cyan-700', isActive);
        link.classList.toggle('text-white', isActive);
        link.classList.toggle('text-slate-200', !isActive);
    });
}

const loadView = async (view, file, title) => {
    const response = await fetch(`./src/views/${file}.html`);
    if (!response.ok) {
        throw new Error(`No se pudo cargar la página (${response.status}).`);
    }

    app.innerHTML = await response.text();
    mountIcons(app);
    pageTitle.textContent = title;
    setActiveLink(view);

    if (view === 'users') await initUsersCrud();
    if (view === 'students') await initStudentsList();
};

const views = {
    home: () => loadView('home', 'home', titles.home),
    users: () => loadView('users', 'users', titles.users),
    students: () => loadView('students', 'students', titles.students),
};

document.addEventListener('click', async (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest('[data-view]');
    const view = link?.dataset.view;

    if (!link || !views[view]) return;
    event.preventDefault();

    try {
        await views[view]();
    } catch (error) {
        console.error('Error al cargar la página:', error);
        pageTitle.textContent = 'Error';
        app.innerHTML = '<p class="rounded-lg bg-red-50 p-4 font-semibold text-red-700">No se pudo cargar esta página. Revisa la conexión y vuelve a intentarlo.</p>';
    }
});

views.home().catch((error) => {
    console.error('Error al cargar la página:', error);
    app.innerHTML = '<p class="rounded-lg bg-red-50 p-4 font-semibold text-red-700">No se pudo cargar el panel. Revisa la conexión y vuelve a intentarlo.</p>';
});