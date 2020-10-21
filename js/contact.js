loadEventListeners();
validateDateTime();

function validateDateTime() {
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
        const time = current[2].value;
        const date = current[3].value;
        let message;

        if ([1, 0].includes(day)) {
            e.preventDefault();
            this.value = '';
            message = 'No se permiten citas en lunes o domingo.';
            displayModal(message);
        } else if (time == '') {
            message = 'Por favor, selecciona primero la hora de tu cita.';
            displayModal(message);
            this.value = '';
            current[2].value = '';
        } else if (e.target.value < today) {
            e.preventDefault();
            this.value = '';
            message = 'La fecha de tu cita no puede ser en días anteriores.';
            displayModal(message);
        } else {
            checkDuplicated(serviceName, date, time)
                .then(response => {
                    if (response.status !== 404) {
                        message = 'No podemos agendar tu cita con la combinación fecha/hora seleccionada porque no está disponible, por favor elige otra fecha/hora.';
                        displayModal(message);
                        this.value = '';
                        current[2].value = '';
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    });
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
                "time": eyebrowExtensionAppointment[2].value,
                "date": eyebrowExtensionAppointment[3].value
            });
        }

        if (hdEyebrowAppointment[2].value !== '') {
            formData.push({
                "name": "Cejas HD",
                "option": hdEyebrowAppointment[1].value,
                "time": hdEyebrowAppointment[2].value,
                "date": hdEyebrowAppointment[3].value
            });
        }

        if (eyebrowIronAppointment[2].value !== '') {
            formData.push({
                "name": "Planchado de ceja",
                "option": eyebrowIronAppointment[1].value,
                "time": eyebrowIronAppointment[2].value,
                "date": eyebrowIronAppointment[3].value
            });
        }

        if (colorEffectAppointment[2].value !== '') {
            formData.push({
                "name": "Efecto de color",
                "type": colorEffectAppointment[0].value,
                "option": colorEffectAppointment[1].value,
                "time": colorEffectAppointment[2].value,
                "date": colorEffectAppointment[3].value
            });
        }

        if (keratinAppointment[2].value !== '') {
            formData.push({
                "name": "Keratina",
                "option": keratinAppointment[1].value,
                "time": keratinAppointment[2].value,
                "date": keratinAppointment[3].value
            });
        }

        if (microBladingAppointment[2].value !== '') {
            formData.push({
                "name": "Microblading",
                "option": microBladingAppointment[1].value,
                "time": microBladingAppointment[2].value,
                "date": microBladingAppointment[3].value
            });
        }

        if (lashLiftAppointment[2].value !== '') {
            formData.push({
                "name": "Lash lift",
                "option": lashLiftAppointment[1].value,
                "time": lashLiftAppointment[2].value,
                "date": lashLiftAppointment[3].value
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

async function checkDuplicated(name, date, time) {
    let url = `http://${window.location.hostname}:3000/appointments`;
    if (window.location.hostname !== '127.0.0.1') {
        url = `https://ariah-server.herokuapp.com/appointments`;
    }

    const response = await fetch(`${url}/check/${name}/${date}/${time}`, {
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