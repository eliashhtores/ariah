loadEventListeners();
validateDate();
const forbiddenDates = ["12-24", "12-25", "01-01"];
let service, option, date, time;

function validateDate() {
    let today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    today = year + '-' + month + '-' + day;

    $('input[type=date]').on('change', function (e) {
        const current = $(`[name="${this.name}"]`);
        const day = new Date(this.value).getUTCDay();
        const short = current[0].id;
        const time = current[3];
        const date = current[2];
        let message;

        time.value = '';
        Object.keys(time).forEach(function (key) {
            time[key].hidden = false;
            time[key].disabled = false;;
        });

        if ([0].includes(day)) {
            e.preventDefault();
            this.value = '';
            message = 'No se permiten citas en domingo.';
            displayModal(message);
        } else if (e.target.value < today) {
            e.preventDefault();
            this.value = '';
            message = 'La fecha de tu cita no puede ser en días anteriores.';
            displayModal(message);
        } else {
            time.removeAttribute("disabled");
            if (forbiddenDates.includes(date.value.slice(5, 10))) {
                this.value = '';
                message = 'Lo sentimos, no tenemos dispobilidad para agendar tu cita en el día seleccionado. Por favor selecciona otro día.';
                displayModal(message);
            } else {
                checkDuplicated(short, date.value)
                    .then(response => {
                        const availableTimes = getValidTimes(time, response, short);
                        if (availableTimes === 1) {
                            this.value = '';
                            message = 'Lo sentimos, no tenemos dispobilidad para agendar tu cita en el día seleccionado. Por favor selecciona otro día.';
                            displayModal(message);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    });
}

function getValidTimes(time, response, short) {
    const index = (element) => element == short;

    let counter = 0;
    let service;

    try {
        service = response[0]._id["short"].findIndex(index);
    } catch (error) {
    }

    for (let i = time.length - 1; i >= 0; i--) {
        Object.keys(response).forEach(function (key) {
            try {
                if (time[i].value == response[key]._id["time"][service]) {
                    time[i].hidden = true;
                    time[i].disabled = true;
                    counter++;
                }
            } catch (error) {
            }
        });
    }
    return time.length - counter;
}

function loadEventListeners() {
    const checkoutButton = document.querySelector('#checkoutButton');
    checkoutButton.disabled = false;
    let formData = [];

    document.querySelectorAll('.selector, .switch').forEach(item => {
        item.addEventListener('change', e => {
            updateDOM(e);
        });
    });

    document.querySelector('form').addEventListener('submit', function (e) {
        let data = {};
        checkoutButton.disabled = true;

        // @TODO refactor this to use 1 selector
        // document.querySelectorAll('.selector, .switch').forEach(item => {
        //     item.addEventListener('change', e => {
        //         updateDOM(e);
        //     });
        // });
        const eyebrowExtensionAppointment = $('[name="eyebrowExtension[]"]');
        const hdEyebrowAppointment = $('[name="hdEyebrow[]"]');
        const eyebrowIronAppointment = $('[name="eyebrowIron[]"]');
        const colorEffectAppointment = $('[name="colorEffect[]"]');
        const keratinAppointment = $('[name="keratin[]"]');
        const microBladingAppointment = $('[name="microBlading[]"]');
        const lashLiftAppointment = $('[name="lashLift[]"]');

        if (eyebrowExtensionAppointment[2].value !== '') {
            formData.push({
                "short": eyebrowExtensionAppointment[0].id,
                "name": "Extensión de pestañas",
                "type": eyebrowExtensionAppointment[0].value,
                "option": eyebrowExtensionAppointment[1].value,
                "date": eyebrowExtensionAppointment[2].value,
                "time": eyebrowExtensionAppointment[3].value
            });
        }

        if (hdEyebrowAppointment[2].value !== '') {
            formData.push({
                "short": hdEyebrowAppointment[0].id,
                "name": "Cejas HD",
                "option": hdEyebrowAppointment[1].value,
                "date": hdEyebrowAppointment[2].value,
                "time": hdEyebrowAppointment[3].value
            });
        }

        if (eyebrowIronAppointment[2].value !== '') {
            formData.push({
                "short": eyebrowIronAppointment[0].id,
                "name": "Planchado de ceja",
                "option": eyebrowIronAppointment[1].value,
                "date": eyebrowIronAppointment[2].value,
                "time": eyebrowIronAppointment[3].value
            });
        }

        if (colorEffectAppointment[2].value !== '') {
            formData.push({
                "short": colorEffectAppointment[0].id,
                "name": "Efecto de color",
                "type": colorEffectAppointment[0].value,
                "option": colorEffectAppointment[1].value,
                "date": colorEffectAppointment[2].value,
                "time": colorEffectAppointment[3].value
            });
        }

        if (keratinAppointment[2].value !== '') {
            formData.push({
                "short": keratinAppointment[0].id,
                "name": "Keratina",
                "option": keratinAppointment[1].value,
                "date": keratinAppointment[2].value,
                "time": keratinAppointment[3].value
            });
        }

        if (microBladingAppointment[2].value !== '') {
            formData.push({
                "short": microBladingAppointment[0].id,
                "name": "Microblading",
                "option": microBladingAppointment[1].value,
                "date": microBladingAppointment[2].value,
                "time": microBladingAppointment[3].value
            });
        }

        if (lashLiftAppointment[2].value !== '') {
            formData.push({
                "short": lashLiftAppointment[0].id,
                "name": "Lash lift",
                "option": lashLiftAppointment[1].value,
                "date": lashLiftAppointment[2].value,
                "time": lashLiftAppointment[3].value
            });
        }

        data["name"] = document.querySelector('#name').value;
        data["phone"] = document.querySelector('#phone').value;
        data["email"] = document.querySelector('#email').value !== '' ? document.querySelector('#email').value : '';
        data["services"] = formData;

        if (formData.length > 0) {
            checkoutButton.disabled = true;
            let host = `http://${window.location.hostname}:3000`;

            if (window.location.hostname !== '127.0.0.1') {
                host = `https://ariah-server.herokuapp.com`;
            }

            const storage = localStorage;
            let appointment = [];
            appointment.push(data);
            storage.setItem("appointment", JSON.stringify(appointment[0]));

            fetch(`${host}/appointments`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
                .then(function (response) {
                    console.log(response);
                    window.location.replace('success.html');
                })
                .catch(function (error) {
                    window.location.replace('cancel.html');
                    console.error('Error:', error);
                });
        } else {
            message = 'Por favor selecciona la cita que deseas agendar';
            displayModal(message)
            checkoutButton.disabled = false;
        }

        e.preventDefault();
    });
};

async function checkDuplicated(short, date) {
    let url = `http://${window.location.hostname}:3000/appointments`;
    if (window.location.hostname !== '127.0.0.1') {
        url = `https://ariah-server.herokuapp.com/appointments`;
    }

    const response = await fetch(`${url}/check/${short}/${date}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    const json = await response.json();

    return json;
}

function displayModal(message) {
    document.querySelector('#textMessage').innerHTML = message;
    $('#messagesModal').modal('show');
}

function updateDOM(e) {
    let option, date, time;
    const service = e.target.parentElement.parentElement.children[0].firstElementChild;

    if (e.target.classList.contains('selector')) {
        option = e.target.parentElement.parentElement.children[1].firstElementChild.firstElementChild;
        date = e.target.parentElement.parentElement.children[2].firstElementChild;
        time = e.target.parentElement.parentElement.children[3].firstElementChild;
    } else {
        option = e.target.parentElement.parentElement.parentElement.children[2].firstElementChild.firstElementChild;
        date = e.target.parentElement.parentElement.parentElement.children[3].firstElementChild;
        time = e.target.parentElement.parentElement.parentElement.children[4].firstElementChild;
    }

    if ((service.value !== '' && service.classList.contains('selector')) || service.checked === true) {
        option.removeAttribute("disabled");
        date.removeAttribute("disabled");
    } else {
        option.setAttribute("disabled", '');
        date.setAttribute("disabled", '');
        date.value = '';
        time.setAttribute("disabled", '');
        time.value = '';
    }
}