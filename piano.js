window.addEventListener('DOMContentLoaded', init);

function init() {
    const buttons = document.querySelectorAll("button");
    let audio = document.getElementById("audio");

    function pauseAudio() {
        if (audio && !audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    }

    function playAudio(src) {
        pauseAudio();
        audio = new Audio();
        audio.src = src;
        audio.play();
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            playAudio(button.dataset.audio);
        });
    });
}