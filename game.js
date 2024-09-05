window.addEventListener('DOMContentLoaded', init);

function init() {
    const buttons = document.querySelectorAll("button");
    const notes = document.querySelectorAll("li img");
    let audio = document.getElementById("audio");
    let currNote = notes[Math.floor(Math.random() * 22)];

    currNote.classList.remove("hidden");

    /**
     * If there is existing audio playing, pauses and resets it
     */
    function pauseAudio() {
        if (audio && !audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    }

    /**
     * Plays audio of given source
     * 
     * @param {*} src source of the audio to be played
     */
    function playAudio(src) {
        pauseAudio();
        audio = new Audio();
        audio.src = src;
        audio.play();
    }

    /**
     * Changes the current note and resets the piano
     */
    function reroll() {
        currNote.classList.add("hidden");
        currNote = notes[Math.floor(Math.random() * 22)];
        currNote.classList.remove("hidden");

        // re-enables all buttons and resets color
        buttons.forEach(button => {
            button.disabled = false;
            button.classList.remove("correct");
            button.classList.remove("incorrect");
        });
    }

    /**
     * Colors the correct button green
     * 
     * @param {} button 
     */
    function correct(button) {
        button.classList.add("correct");
    }

    /**
     * Colors the incorrect button red and disables it
     * 
     * @param {} button 
     */
    function incorrect(button) {
        button.classList.add("incorrect");
        button.disabled = !button.disabled;
    }

    /**
     * Changes buttons from being clickable to nonclickable and vice versa
     */
    function disableButtons() {
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if (button.dataset.note == currNote.dataset.note) {
                playAudio(button.dataset.audio);
                disableButtons();
                correct(button);
                setTimeout(() => {reroll();}, 1000)
            }
            else {
                playAudio(button.dataset.audio);
                incorrect(button);
            }
        });
    });
}