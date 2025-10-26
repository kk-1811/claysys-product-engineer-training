const eventsContainer = document.getElementById('eventsContainer');
const addEventBtn = document.getElementById('addEventBtn');
const adminPanelBtn = document.getElementById('adminPanelBtn');
const adminModule = document.getElementById('adminModule');

const eventFormContainer = document.getElementById('eventFormContainer');
const eventForm = document.getElementById('eventForm');
const closeEventForm = document.getElementById('closeEventForm');

const guestFormContainer = document.getElementById('guestFormContainer');
const guestForm = document.getElementById('guestForm');
const closeGuestForm = document.getElementById('closeGuestForm');

const agendaFormContainer = document.getElementById('agendaFormContainer');
const agendaForm = document.getElementById('agendaForm');
const closeAgendaForm = document.getElementById('closeAgendaForm');

const eventCategorySelect = document.getElementById('eventCategory');

let events = JSON.parse(localStorage.getItem('events')) || [];
let guests = JSON.parse(localStorage.getItem('guests')) || [];
let agendas = JSON.parse(localStorage.getItem('agendas')) || [];
let categories = JSON.parse(localStorage.getItem('categories'));
if (!categories || categories.length === 0) {
    categories = [
        { name: "Birthday" },
        { name: "Wedding" },
        { name: "Commercial Events" },
        { name: "Meetings" },
        { name: "Social Events" },
        { name: "Others" }
    ];
    localStorage.setItem('categories', JSON.stringify(categories));
}
let users = JSON.parse(localStorage.getItem('users')) || [];

function saveToLocalStorage() {
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('guests', JSON.stringify(guests));
    localStorage.setItem('agendas', JSON.stringify(agendas));
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('users', JSON.stringify(users));
}

function populateCategoryOptions() {
    eventCategorySelect.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Category';
    eventCategorySelect.appendChild(defaultOption);

    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.name;
        option.textContent = cat.name;
        eventCategorySelect.appendChild(option);
    });
}

function renderEvents() {
    eventsContainer.innerHTML = '';
    events.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('event-card');
        card.innerHTML = `
            <h3>${event.name}</h3>
            <div class="event-info">
                <p><strong>Date & Time:</strong> ${event.dateTime}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p>${event.description}</p>
                <span class="status ${event.status}">${event.status}</span>
            </div>
            <div class="event-buttons">
                <button class="edit-event" data-id="${event.id}">Edit</button>
                <button class="manage-guests" data-id="${event.id}">Guests</button>
                <button class="manage-agenda" data-id="${event.id}">Agenda</button>
                <button class="delete-event" data-id="${event.id}">Delete</button>
            </div>
        `;
        eventsContainer.appendChild(card);
    });
}

addEventBtn.addEventListener('click', () => {
    populateCategoryOptions();
    eventFormContainer.style.display = 'flex';
    eventForm.dataset.editing = '';
});

closeEventForm.addEventListener('click', () => {
    eventFormContainer.style.display = 'none';
    eventForm.reset();
});

eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('eventName').value.trim();
    const dateTime = document.getElementById('eventDateTime').value;
    const location = document.getElementById('eventLocation').value.trim();
    const description = document.getElementById('eventDescription').value.trim();
    const category = document.getElementById('eventCategory').value;
    const status = document.getElementById('eventStatus').value;

    if (!category) {
        alert('Please select a category');
        return;
    }

    if (eventForm.dataset.editing) {
        const id = Number(eventForm.dataset.editing);
        const index = events.findIndex(ev => ev.id === id);
        events[index] = { id, name, dateTime, location, description, category, status };
    } else {
        const id = Date.now();
        events.push({ id, name, dateTime, location, description, category, status });
    }

    saveToLocalStorage();
    renderEvents();
    eventFormContainer.style.display = 'none';
    eventForm.reset();
});

eventsContainer.addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);
    if (e.target.classList.contains('edit-event')) {
        populateCategoryOptions();
        const eventObj = events.find(ev => ev.id === id);
        document.getElementById('eventName').value = eventObj.name;
        document.getElementById('eventDateTime').value = eventObj.dateTime;
        document.getElementById('eventLocation').value = eventObj.location;
        document.getElementById('eventDescription').value = eventObj.description;
        document.getElementById('eventCategory').value = eventObj.category;
        document.getElementById('eventStatus').value = eventObj.status;
        eventForm.dataset.editing = id;
        eventFormContainer.style.display = 'flex';
    } else if (e.target.classList.contains('delete-event')) {
        events = events.filter(ev => ev.id !== id);
        saveToLocalStorage();
        renderEvents();
    } else if (e.target.classList.contains('manage-guests')) {
        guestFormContainer.style.display = 'flex';
    } else if (e.target.classList.contains('manage-agenda')) {
        agendaFormContainer.style.display = 'flex';
    }
});

const guestNameInput = document.getElementById('guestName');
const guestEmailInput = document.getElementById('guestEmail');
const guestListTable = document.querySelector('#guestList tbody');

guestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = guestNameInput.value.trim();
    const email = guestEmailInput.value.trim();
    if (name === '' || email === '') return;
    const guest = { id: Date.now(), name, email, rsvp: 'Pending' };
    guests.push(guest);
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${guest.name}</td>
        <td>${guest.email}</td>
        <td>${guest.rsvp}</td>
        <td>
            <button class="edit-guest" data-id="${guest.id}">Edit</button>
            <button class="delete-guest" data-id="${guest.id}">Delete</button>
        </td>
    `;
    guestListTable.appendChild(row);
    guestNameInput.value = '';
    guestEmailInput.value = '';
    saveToLocalStorage();
});

guestListTable.addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);
    if (e.target.classList.contains('delete-guest')) {
        guests = guests.filter(g => g.id !== id);
        e.target.parentElement.parentElement.remove();
        saveToLocalStorage();
    } else if (e.target.classList.contains('edit-guest')) {
        const guestObj = guests.find(g => g.id === id);
        const newName = prompt('Edit Name', guestObj.name);
        const newEmail = prompt('Edit Email', guestObj.email);
        if (newName && newEmail) {
            guestObj.name = newName;
            guestObj.email = newEmail;
            const row = e.target.parentElement.parentElement;
            row.children[0].textContent = newName;
            row.children[1].textContent = newEmail;
            saveToLocalStorage();
        }
    }
});

const agendaListTable = document.querySelector('#agendaList tbody');

agendaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const start = document.getElementById('agendaStart').value;
    const end = document.getElementById('agendaEnd').value;
    const description = document.getElementById('agendaDescription').value.trim();
    if (start === '' || end === '' || description === '') return;
    const agenda = { id: Date.now(), start, end, description };
    agendas.push(agenda);
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${start}</td>
        <td>${end}</td>
        <td>${description}</td>
        <td>
            <button class="edit-agenda" data-id="${agenda.id}">Edit</button>
            <button class="delete-agenda" data-id="${agenda.id}">Delete</button>
        </td>
    `;
    agendaListTable.appendChild(row);
    agendaForm.reset();
    saveToLocalStorage();
});

agendaListTable.addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);
    if (e.target.classList.contains('delete-agenda')) {
        agendas = agendas.filter(a => a.id !== id);
        e.target.parentElement.parentElement.remove();
        saveToLocalStorage();
    } else if (e.target.classList.contains('edit-agenda')) {
        const agendaObj = agendas.find(a => a.id === id);
        const newStart = prompt('Edit Start Time', agendaObj.start);
        const newEnd = prompt('Edit End Time', agendaObj.end);
        const newDesc = prompt('Edit Description', agendaObj.description);
        if (newStart && newEnd && newDesc) {
            agendaObj.start = newStart;
            agendaObj.end = newEnd;
            agendaObj.description = newDesc;
            const row = e.target.parentElement.parentElement;
            row.children[0].textContent = newStart;
            row.children[1].textContent = newEnd;
            row.children[2].textContent = newDesc;
            saveToLocalStorage();
        }
    }
});

adminPanelBtn.addEventListener('click', () => {
    adminModule.style.display = adminModule.style.display === 'none' ? 'block' : 'none';
});

closeEventForm.addEventListener('click', () => { eventFormContainer.style.display = 'none'; eventForm.reset(); });
closeGuestForm.addEventListener('click', () => { guestFormContainer.style.display = 'none'; guestForm.reset(); });
closeAgendaForm.addEventListener('click', () => { agendaFormContainer.style.display = 'none'; agendaForm.reset(); });

window.addEventListener('click', (e) => {
    if (e.target === eventFormContainer) { eventFormContainer.style.display = 'none'; eventForm.reset(); }
    else if (e.target === guestFormContainer) { guestFormContainer.style.display = 'none'; guestForm.reset(); }
    else if (e.target === agendaFormContainer) { agendaFormContainer.style.display = 'none'; agendaForm.reset(); }
});

populateCategoryOptions();
renderEvents();
