const appointments = document.querySelector('#appointments')

window.onload = function () {
    let today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    today = year + '-' + month + '-' + day;

    $.ajax({
        url: `http://localhost:3000/appointments/admin/${today}`,
        crossDomain: true,
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                const name = response[i].name;
                const email = response[i].email !== undefined ? response[i].email : '';
                const div = document.createElement("div");
                div.innerHTML = `<strong>Nombre:</strong> ${name} <br>`;
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
                        <small>${response[i].services[j].time}</small> <br>
                        <small>${response[i].services[j].date}</small> <br><br>`;
                    }
                }
                div.innerHTML += '<hr>';
                appointments.appendChild(div);

            }
        },
        error: function (err) {
            console.log(err);
            alert('Ocurrió un error, favor de intentar más tarde');
        }
    });
}
