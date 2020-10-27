const storage = localStorage;
let appointment = JSON.parse(storage.getItem("appointment"));

if (appointment) {
    renderAppointment(appointment);
    deleteSession();
}

function renderAppointment(appointment) {
    let today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    today = year + '-' + month + '-' + day;

    const name = appointment.name;
    const phone = appointment.phone !== undefined ? appointment.phone : '';
    const email = appointment.email !== undefined ? appointment.email : '';
    const div = document.createElement("div");
    div.innerHTML = `<strong>Nombre:</strong> ${name} <br>`;
    if (phone) {
        div.innerHTML += `<strong>Teléfono:</strong> ${phone} <br>`;
    }
    if (email) {
        div.innerHTML += `<strong>Correo:</strong> ${email} <br>`;
    }
    appointments.appendChild(div);
    let type;
    div.innerHTML += '<strong>Citas</strong>:<br>';

    for (let i = 0; i < appointment.services.length; i++) {
        if (appointment.services[i].date < today) {
            continue;
        } else {
            type = appointment.services[i].type !== undefined ? `<small>${appointment.services[i].type}</small><br>` : '';
            div.innerHTML += `- ${appointment.services[i].name} -<br>
                        ${type}
                        <small>${appointment.services[i].option}</small> <br>
                        <small>${appointment.services[i].date} a las ${appointment.services[i].time}</small><br>`;
        }
    }

    div.innerHTML += '<hr>';
    appointments.appendChild(div);
}
