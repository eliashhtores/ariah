loadEventListeners();
validateDate();

function validateDate() {
    let today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    today = year + '-' + month + '-' + day;

    $('input[type=date]').on('change', function (e) {
        const current = $(`[name="${this.name}"]`);
        const day = new Date(this.value).getUTCDay();
        const serviceName = mapServiceNames(current[0].id);
        const time = current[3];
        const date = current[2];
        let message;

        time.value = '';
        Object.keys(time).forEach(function (key) {
            time[key].style.display = 'block';
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
            checkDuplicated(serviceName, date.value)
                .then(response => {
                    const availableTimes = validateTime(time, response);
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
    });
}

function validateTime(time, response) {
    let counter = 0;
    for (let i = time.length - 1; i >= 0; i--) {
        Object.keys(response).forEach(function (key) {
            if (response[key] == time[i].value) {
                time[i].style.display = 'none';
                counter++;
            }
        });
    }
    return time.length - counter;
}

function loadEventListeners() {
    const checkoutButton = document.querySelector('#checkoutButton');
    checkoutButton.disabled = false;
    let formData = [];

    document.querySelectorAll('.selector').forEach(item => {
        item.addEventListener('change', e => {
            const service = e.target.parentElement.parentElement.children[0].firstElementChild.value;
            const option = e.target.parentElement.parentElement.children[1].firstElementChild.firstElementChild;
            const date = e.target.parentElement.parentElement.children[2].firstElementChild;
            const time = e.target.parentElement.parentElement.children[3].firstElementChild;

            if (service !== '') {
                option.removeAttribute("disabled");
                date.removeAttribute("disabled");
            } else {
                option.setAttribute("disabled", '');
                date.setAttribute("disabled", '');
                date.value = '';
                time.setAttribute("disabled", '');
                time.value = '';
            }
        });
    });

    document.querySelectorAll('.switch').forEach(item => {
        item.addEventListener('change', e => {
            const service = e.target.parentElement.parentElement.children[0].firstElementChild;
            const option = e.target.parentElement.parentElement.parentElement.children[2].firstElementChild.firstElementChild;
            const date = e.target.parentElement.parentElement.parentElement.children[3].firstElementChild;
            const time = e.target.parentElement.parentElement.parentElement.children[4].firstElementChild;

            if (service.checked === true) {
                option.removeAttribute("disabled");
                date.removeAttribute("disabled");
                time.removeAttribute("disabled");
            } else {
                option.setAttribute("disabled", '');
                date.setAttribute("disabled", '');
                date.value = '';
                time.setAttribute("disabled", '');
                time.value = '';
            }
        });
    });

    document.querySelector('form').addEventListener('submit', function (e) {
        let data = {};
        checkoutButton.disabled = true;

        const eyebrowExtensionAppointment = $('[name="eyebrowExtension[]"]');
        const hdEyebrowAppointment = $('[name="hdEyebrow[]"]');
        const eyebrowIronAppointment = $('[name="eyebrowIron[]"]');
        const colorEffectAppointment = $('[name="colorEffect[]"]');
        const keratinAppointment = $('[name="keratin[]"]');
        const microBladingAppointment = $('[name="microBlading[]"]');
        const lashLiftAppointment = $('[name="lashLift[]"]');

        if (eyebrowExtensionAppointment[2].value !== '') {
            formData.push({
                "name": "Extensión de pestañas",
                "type": eyebrowExtensionAppointment[0].value,
                "option": eyebrowExtensionAppointment[1].value,
                "date": eyebrowExtensionAppointment[2].value,
                "time": eyebrowExtensionAppointment[3].value
            });
        }

        if (hdEyebrowAppointment[2].value !== '') {
            formData.push({
                "name": "Cejas HD",
                "option": hdEyebrowAppointment[1].value,
                "date": hdEyebrowAppointment[2].value,
                "time": hdEyebrowAppointment[3].value
            });
        }

        if (eyebrowIronAppointment[2].value !== '') {
            formData.push({
                "name": "Planchado de ceja",
                "option": eyebrowIronAppointment[1].value,
                "date": eyebrowIronAppointment[2].value,
                "time": eyebrowIronAppointment[3].value
            });
        }

        if (colorEffectAppointment[2].value !== '') {
            formData.push({
                "name": "Efecto de color",
                "type": colorEffectAppointment[0].value,
                "option": colorEffectAppointment[1].value,
                "date": colorEffectAppointment[2].value,
                "time": colorEffectAppointment[3].value
            });
        }

        if (keratinAppointment[2].value !== '') {
            formData.push({
                "name": "Keratina",
                "option": keratinAppointment[1].value,
                "date": keratinAppointment[2].value,
                "time": keratinAppointment[3].value
            });
        }

        if (microBladingAppointment[2].value !== '') {
            formData.push({
                "name": "Microblading",
                "option": microBladingAppointment[1].value,
                "date": microBladingAppointment[2].value,
                "time": microBladingAppointment[3].value
            });
        }

        if (lashLiftAppointment[2].value !== '') {
            formData.push({
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

// @TODO Change DB structure to get rid of this 
function mapServiceNames(id) {
    const services = {
        "eyebrowExtension": "Extensión de pestañas",
        "hdEyebrow": "Cejas HD",
        "eyebrowIron": "Planchado de ceja",
        "colorEffect": "Efecto de color",
        "keratin": "Keratina",
        "microBlading": "Microblading",
        "lashLift": "Lash lift",
    };
    return services[id];
}

async function checkDuplicated(name, date) {
    let url = `http://${window.location.hostname}:3000/appointments`;
    if (window.location.hostname !== '127.0.0.1') {
        url = `https://ariah-server.herokuapp.com/appointments`;
    }

    const response = await fetch(`${url}/check/${name}/${date}`, {
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