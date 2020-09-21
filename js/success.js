let host = `http://${window.location.hostname}:3000`;

if (window.location.hostname !== '127.0.0.1') {
    host = `https://ariah-server.herokuapp.com`;
}

const storage = localStorage;
let appointment = JSON.parse(storage.getItem("appointment"));

if (appointment) {
    createAppointment(appointment);
    deleteSession();
}

function createAppointment(data) {
    $.ajax({
        url: `${host}/appointments`,
        crossDomain: true,
        data: JSON.stringify(data),
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        dataType: "json",
        success: function (response) {
            console.log(response);
        },
        error: function (err) {
            console.log(err);
            alert('Ocurrió un error, favor de intentar más tarde');
        }
    });
}
