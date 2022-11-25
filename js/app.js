// Call this in case the server is idle
wakeUpServer()

// Get the current year for the copyright
$('#year').text(new Date().getFullYear())

// Configure Slider
$('.carousel').carousel({
    interval: 3000,
    pause: 'hover'
})

// Lightbox Init
$(document).on('click', '[data-toggle="lightbox"]', function (event) {
    event.preventDefault()
    $(this).ekkoLightbox()
})

// Video Play
$(function () {
    // Auto play modal video
    $(".video").click(function () {
        var theModal = $(this).data("target"),
            videoSRC = $(this).attr("data-video"),
            videoSRCauto = videoSRC + "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1"
        $(theModal + ' iframe').attr('src', videoSRCauto)
        $(theModal + ' button.close').click(function () {
            $(theModal + ' iframe').attr('src', videoSRC)
        })
    })
})

async function wakeUpServer() {
    let url = `http://${window.location.hostname}:3000/appointments`
    if (window.location.hostname !== '127.0.0.1') {
        url = `https://troubled-jay-dirndl.cyclic.app/appointments`
    }

    await fetch(`${url}/5f6ba573c5ab8a2180f789a0`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.error('Error:', error)
        })
}

function deleteSession() {
    localStorage.removeItem('appointment')
}