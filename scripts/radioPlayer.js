const RadioPlayerInit = () => {
    const radio = document.querySelector('.radio')
    const radioImg = radio.querySelector('.radio-cover__img')
    const radioNavigation = radio.querySelector('.radio-navigation')
    const radioHeaderBig = radio.querySelector('.radio-header__big')
    const radioItem = radio.querySelectorAll('.radio-item')
    const radioStop = radio.querySelector('.radio-stop')

    radioStop.disabled = true

    const audio = new Audio()
    audio.type = 'audio/aac'

    const changeIcon = () => {
        if (audio.paused) {
            radio.classList.remove('play')
            radioStop.classList.add('fa-play')
            radioStop.classList.remove('fa-stop')
        } else {
            radio.classList.add('play')
            radioStop.classList.add('fa-stop')
            radioStop.classList.remove('fa-play')
        }
    }

    const selectItem = element => {
        radioItem.forEach(item => item.classList.remove('select'))
        element.classList.add('select')
    }

    const radioPlayHandler = async event => {
        radioStop.disabled = false
        try {
            const target = event.target
            const parent = target.closest('.radio-item')
            selectItem(parent)

            const title = parent.querySelector('.radio-name').textContent
            radioHeaderBig.textContent = title

            const img = parent.querySelector('.radio-img').src
            radioImg.src = img

            audio.src = target.dataset.radioStantion
            await audio.play()
            changeIcon()

        } catch (error) {
            console.log(error)
        }
    }

    radioNavigation.addEventListener('change', radioPlayHandler)
    radioStop.addEventListener('click', () => {
        audio.paused ? audio.play() : audio.pause()
        changeIcon()
    })
}

export default RadioPlayerInit