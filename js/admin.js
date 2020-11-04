const appointments = document.querySelector('#appointments');

window.onload = function () {

    document.querySelector('.loader-wrapper').style.transition = '0.8s';
    document.querySelector('.loader-wrapper').style.opacity = 0;

    let today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    today = year + '-' + month + '-' + day;
    let url = `http://${window.location.hostname}:3000/appointments/admin/${today}`;

    if (window.location.hostname !== '127.0.0.1') {
        url = `https://ariah-server.herokuapp.com/appointments/admin/${today}`;
    }

    const div = document.createElement("div");
    fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(function (response) {
            return response.json();
        }).then(function (response) {
            console.log(response);

            if (response.status == 404) {
                div.innerHTML = 'No existen citas programadas por el momento.';
                appointments.appendChild(div);
            } else {
                for (let i = 0; i < response.length; i++) {
                    const name = response[i].name;
                    const phone = response[i].phone !== undefined ? response[i].phone : '';
                    const email = response[i].email !== undefined ? response[i].email : '';
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

                    for (let j = 0; j < response[i].services.length; j++) {
                        if (response[i].services[j].date < today) {
                            continue;
                        } else {
                            type = response[i].services[j].type !== undefined ? `<small>${response[i].services[j].type}</small> <br>` : '';
                            div.innerHTML += `- ${response[i].services[j].name} -<br>
                        ${type}
                        <small>${response[i].services[j].option}</small> <br>
                        <small>${response[i].services[j].date} a las ${response[i].services[j].time}</small> <br><br>`;
                        }
                    }
                    div.innerHTML += '<hr>';
                    appointments.appendChild(div);

                }
            }
        })
        .catch(function (error) {
            alert('Ocurrió un error, favor de intentar más tarde');
            console.error('Error:', error);
        });
}
