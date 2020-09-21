loadEventListeners();

let today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();
today = year + '-' + month + '-' + day;

function loadEventListeners() {
    const checkoutButton = document.querySelector('#checkoutButton');
    checkoutButton.disabled = false;
    let formData = [];

    document.querySelector('#eyebrowExtension').addEventListener('change', () => {
        const eyebrowExtension = document.querySelector('#eyebrowExtension').value;
        const eyebrowExtensionOption = document.querySelector('#eyebrowExtensionOption');
        const eyebrowExtensionDate = document.querySelector('#eyebrowExtensionDate');
        const eyebrowExtensionTime = document.querySelector('#eyebrowExtensionTime');

        if (eyebrowExtension !== '') {
            eyebrowExtensionOption.removeAttribute("disabled");
            eyebrowExtensionDate.removeAttribute("disabled");
            eyebrowExtensionTime.removeAttribute("disabled");
        } else {
            eyebrowExtensionOption.setAttribute("disabled", '');
            eyebrowExtensionDate.setAttribute("disabled", '');
            eyebrowExtensionTime.setAttribute("disabled", '');
        }

        eyebrowExtensionDate.addEventListener('change', (e) => {
            if (e.target.value < today) {
                invalidDate();
            }
        });
    });

    document.querySelector('#hdEyebrow').addEventListener('change', () => {
        const hdEyebrow = document.querySelector('#hdEyebrow');
        const hdEyebrowOption = document.querySelector('#hdEyebrowOption');
        const hdEyebrowDate = document.querySelector('#hdEyebrowDate');
        const hdEyebrowTime = document.querySelector('#hdEyebrowTime');

        if (hdEyebrow.checked === true) {
            hdEyebrowOption.removeAttribute("disabled");
            hdEyebrowDate.removeAttribute("disabled");
            hdEyebrowTime.removeAttribute("disabled");
        } else {
            hdEyebrowOption.setAttribute("disabled", '');
            hdEyebrowDate.setAttribute("disabled", '');
            hdEyebrowTime.setAttribute("disabled", '');
        }

        hdEyebrowDate.addEventListener('change', (e) => {
            if (e.target.value < today) {
                invalidDate();
            }
        });
    });

    document.querySelector('#eyebrowIron').addEventListener('change', () => {
        const eyebrowIron = document.querySelector('#eyebrowIron');
        const eyebrowIronOption = document.querySelector('#eyebrowIronOption');
        const eyebrowIronDate = document.querySelector('#eyebrowIronDate');
        const eyebrowIronTime = document.querySelector('#eyebrowIronTime');

        if (eyebrowIron.checked === true) {
            eyebrowIronOption.removeAttribute("disabled");
            eyebrowIronDate.removeAttribute("disabled");
            eyebrowIronTime.removeAttribute("disabled");
        } else {
            eyebrowIronOption.setAttribute("disabled", '');
            eyebrowIronDate.setAttribute("disabled", '');
            eyebrowIronTime.setAttribute("disabled", '');
        }

        eyebrowIronDate.addEventListener('change', (e) => {
            if (e.target.value < today) {
                invalidDate();
            }
        });
    });

    document.querySelector('#colorEffect').addEventListener('change', () => {
        const colorEffect = document.querySelector('#colorEffect').value;
        const colorEffectOption = document.querySelector('#colorEffectOption');
        const colorEffectDate = document.querySelector('#colorEffectDate');
        const colorEffectTime = document.querySelector('#colorEffectTime');

        if (colorEffect !== '') {
            colorEffectOption.removeAttribute("disabled");
            colorEffectDate.removeAttribute("disabled");
            colorEffectTime.removeAttribute("disabled");
        } else {
            colorEffectOption.setAttribute("disabled", '');
            colorEffectDate.setAttribute("disabled", '');
            colorEffectTime.setAttribute("disabled", '');
        }

        colorEffectDate.addEventListener('change', (e) => {
            if (e.target.value < today) {
                invalidDate();
            }
        });
    });

    document.querySelector('#keratin').addEventListener('change', () => {
        const keratin = document.querySelector('#keratin');
        const keratinOption = document.querySelector('#keratinOption');
        const keratinDate = document.querySelector('#keratinDate');
        const keratinTime = document.querySelector('#keratinTime');

        if (keratin.checked === true) {
            keratinOption.removeAttribute("disabled");
            keratinDate.removeAttribute("disabled");
            keratinTime.removeAttribute("disabled");
        } else {
            keratinOption.setAttribute("disabled", '');
            keratinDate.setAttribute("disabled", '');
            keratinTime.setAttribute("disabled", '');
        }

        keratinDate.addEventListener('change', (e) => {
            if (e.target.value < today) {
                invalidDate();
            }
        });
    });

    document.querySelector('#microBlading').addEventListener('change', () => {
        const microBlading = document.querySelector('#microBlading');
        const microBladingOption = document.querySelector('#microBladingOption');
        const microBladingDate = document.querySelector('#microBladingDate');
        const microBladingTime = document.querySelector('#microBladingTime');

        if (microBlading.checked === true) {
            microBladingOption.removeAttribute("disabled");
            microBladingDate.removeAttribute("disabled");
            microBladingTime.removeAttribute("disabled");
        } else {
            microBladingOption.setAttribute("disabled", '');
            microBladingDate.setAttribute("disabled", '');
            microBladingTime.setAttribute("disabled", '');
        }

        microBladingDate.addEventListener('change', (e) => {
            if (e.target.value < today) {
                invalidDate();
            }
        });
    });

    document.querySelector('#lashLift').addEventListener('change', () => {
        const lashLift = document.querySelector('#lashLift');
        const lashLiftOption = document.querySelector('#lashLiftOption');
        const lashLiftDate = document.querySelector('#lashLiftDate');
        const lashLiftTime = document.querySelector('#lashLiftTime');

        if (lashLift.checked === true) {
            lashLiftOption.removeAttribute("disabled");
            lashLiftDate.removeAttribute("disabled");
            lashLiftTime.removeAttribute("disabled");
        } else {
            lashLiftOption.setAttribute("disabled", '');
            lashLiftDate.setAttribute("disabled", '');
            lashLiftTime.setAttribute("disabled", '');
        }

        lashLiftDate.addEventListener('change', (e) => {
            if (e.target.value < today) {
                invalidDate();
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

        // Create an instance of the Stripe object with the publishable API key
        let host = `http://${window.location.hostname}:3000`;
        let key = 'pk_test_51HOsn3GD6aQ2YRETSrkC22e2VavAtvA56qcFJOMuDvDWpDa2ENUC3JmPL05yxDizCSQl6z1spTJIZP6T5oll56kJ00WQhWFlJx';

        if (window.location.hostname !== '127.0.0.1') {
            host = `https://ariah-server.herokuapp.com`;
            key = 'pk_live_51HOsn3GD6aQ2YRETGnCEU127RtuFXbrnv1ZM6lNgsSznNv1chou2uPpG09M0kdDSTXSLHZIvTVbLdSLlWs0pBn3o00HGc0v5GB';
        }

        const storage = localStorage;
        let appointment = [];
        console.log(data);
        appointment.push(data);
        storage.setItem("appointment", JSON.stringify(appointment[0]));

        const stripe = Stripe(key);
        // Create a new Checkout Session
        fetch(`${host}/appointments/create-checkout-session`, {
            method: 'POST',
            body: JSON.stringify({
                data: formData.length,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (session) {
                return stripe.redirectToCheckout({ sessionId: session.id });
            })
            .then(function (result) {
                // If `redirectToCheckout` fails due to a browser or network
                // error, display the localized error message to the
                // customer using `error.message`.
                if (result.error) {
                    alert(result.error.message);
                }
            })
            .catch(function (error) {
                console.error('Error:', error);
            });

        e.preventDefault();
    });
};

function invalidDate() {
    alert('La fecha de tu cita no puede ser en días anteriores.');
}