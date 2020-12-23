import RadioPlayerInit from "./radioPlayer.js"
import VideoPlayerInit from "./videoPlayer.js";
import MusicPlayerInit from "./musicPlayer.js";

const playerBtn = document.querySelectorAll('.player-btn')
const playerBlock = document.querySelectorAll('.player-block')
const temp = document.querySelector('.temp')

const deactivationPlayer = () => {
    temp.style.display = 'none'
    playerBlock.forEach(item => item.classList.remove('active'))
    playerBtn.forEach(item => item.classList.remove('active'))
}

playerBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        deactivationPlayer()
        btn.classList.add('active')
        playerBlock[index].classList.add('active')
    })
})


VideoPlayerInit()
MusicPlayerInit()
RadioPlayerInit()