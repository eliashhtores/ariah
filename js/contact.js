loadEventListeners();

let today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();
today = year + '-' + month + '-' + day;

function loadEventListeners() {

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

    document.querySelector('#closeModal').addEventListener('click', () => {
        $('#confirmModal').modal('hide');
        window.location.replace("index.html");
    });

    document.querySelector('form').addEventListener('submit', function (e) {
        let formData = [];
        let data = {};
        const form = $(this).serializeArray();

        form.map((element => {
            if (element.value !== "" && element.name !== "name" && element.name !== "email" && element.name !== "date" && element.name !== "time") {
                const name = element.name;
                const value = element.value;
                formData.push({ name, value });
            }

            if (element.name === "name" || element.name === "date" || element.name === "time") {
                data[element.name] = element.value;
            }

            if (element.name === "email" && element.value !== "") {
                data[element.name] = element.value
            }
        }));

        data["services"] = formData;

        $.ajax({
            url: 'http://localhost:3000/appointments',
            crossDomain: true,
            data: JSON.stringify(data),
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            dataType: "json",
            success: function (response) {
                $('#confirmModal').modal('show');
                document.getElementById("appointmentConfirmed").innerHTML = `¡Cita(s) agendada(s)!`;
                console.log(response);
            },
            error: function (err) {
                console.log(err);
                alert('Ocurrió un error, favor de intentar más tarde');
            }
        });

        e.preventDefault();
    });
};

function invalidDate() {
    alert('La fecha de tu cita no puede ser en días anteriores.');
}