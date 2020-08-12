loadEventListeners();

function loadEventListeners() {
    document.querySelector('#eyebrowExtension').addEventListener('change', () => {
        const eyebrowExtension = document.querySelector('#eyebrowExtension').value;
        const eyebrowExtensionOption = document.querySelector('#eyebrowExtensionOption');
        eyebrowExtension !== '' ? eyebrowExtensionOption.removeAttribute("disabled") : eyebrowExtensionOption.setAttribute("disabled", '');
    });

    document.querySelector('#hdEyebrow').addEventListener('change', () => {
        const hdEyebrow = document.querySelector('#hdEyebrow')
        const hdEyebrowOption = document.querySelector('#hdEyebrowOption');
        hdEyebrow.checked === true ? hdEyebrowOption.removeAttribute("disabled") : hdEyebrowOption.setAttribute("disabled", '');
    });

    document.querySelector('#eyebrowIron').addEventListener('change', () => {
        const eyebrowIron = document.querySelector('#eyebrowIron')
        const eyebrowIronOption = document.querySelector('#eyebrowIronOption');
        eyebrowIron.checked === true ? eyebrowIronOption.removeAttribute("disabled") : eyebrowIronOption.setAttribute("disabled", '');
    });

    document.querySelector('#colorEffect').addEventListener('change', () => {
        const colorEffect = document.querySelector('#colorEffect').value;
        const colorEffectOption = document.querySelector('#colorEffectOption');
        colorEffect !== '' ? colorEffectOption.removeAttribute("disabled") : colorEffectOption.setAttribute("disabled", '');
    });

    document.querySelector('#microBlading').addEventListener('change', () => {
        const microBlading = document.querySelector('#microBlading')
        const microBladingOption = document.querySelector('#microBladingOption');
        microBlading.checked === true ? microBladingOption.removeAttribute("disabled") : microBladingOption.setAttribute("disabled", '');
    });

    document.querySelector('#lashLift').addEventListener('change', () => {
        const lashLift = document.querySelector('#lashLift')
        const lashLiftOption = document.querySelector('#lashLiftOption');
        lashLift.checked === true ? lashLiftOption.removeAttribute("disabled") : lashLiftOption.setAttribute("disabled", '');
    });

    document.querySelector('form').addEventListener('submit', function (e) {
        let data = {};
        const form = $(this).serializeArray();

        form.map((element => {
            if (element.value !== '')
                data[element.name] = element.value;
        }));

        e.preventDefault();
    });
};