import Gameplay_UI from "./gameplayUI.js";

class Sound
{
    audio_control; //= document.querySelector("#bg_audio")
    source;
    audio_id;

    constructor(src,id)
    {
        this.source = src;
        this.audio_id = id;
    }

    add_sound()
    {
        const sound = document.createElement("audio");
        sound.setAttribute("src",this.source);
        sound.setAttribute("controls","controls");
        sound.setAttribute("id",this.audio_id);
        document.body.appendChild(sound);

        this.audio_control = document.querySelector(`#${this.audio_id}`);
    }

    play_music()
    {
        this.audio_control.play();
    }

    pause_music()
    {
        this.audio_control.pause();
    }
}

//"media/Deep Torvus_3.mp3"

export default Sound;