const MusicPlayerInit = () => {
    const audio = document.querySelector('.audio')
    const audioImg  = audio.querySelector('.audio-img')
    const audioHeader = audio.querySelector('.audio-header')
    const audioPlayer = audio.querySelector('.audio-player')
    const audioNavigation = audio.querySelector('.audio-navigation')
    const audioButtonPlay = audio.querySelector('.audio-button__play')
    const audioProgress = audio.querySelector('.audio-progress')
    const audioProgressTiming = audio.querySelector('.audio-progress__timing')
    const audioTimePassed = audio.querySelector('.audio-time__passed')
    const audioTimeTotal = audio.querySelector('.audio-time__total')


    const playList = ['flow', 'hello', 'speed', 'Dan Balan']
    let trackIndex = 0

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused
        const track = playList[trackIndex]

        audioImg.src = `./audio/${track}.jpg`
        audioPlayer.src = `./audio/${track}.mp3`
        audioHeader.textContent = track.toUpperCase()

        isPlayed ? audioPlayer.pause() : audioPlayer.play()
    }

    const prevTrack = () => {
        trackIndex !== 0 ? trackIndex -- : trackIndex = playList.length - 1
        loadTrack()
    }

    const nextTrack = () => {
        trackIndex === playList.length - 1 ? trackIndex = 0 : trackIndex++
        loadTrack()
    }

    const addZero = n => n < 10 ? '0' + n : n   //Check minute and second of zero

    const audioPLayerHandler = event => {
        const target = event.target
        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play')
            audioButtonPlay.classList.toggle('fa-play')
            audioButtonPlay.classList.toggle('fa-pause')

            audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause()
            const track = playList[trackIndex]
            audioHeader.textContent = track.toUpperCase()
        }

        if (target.classList.contains('audio-button__next')) {
            nextTrack()
        }

        if (target.classList.contains('audio-button__prev')) {
            prevTrack()
        }
    }
    audioNavigation.addEventListener('click', audioPLayerHandler)

    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration
        const currentTime = audioPlayer.currentTime
        const progress = (currentTime / duration) * 100

        audioProgressTiming.style.width = progress + '%'

        let minutePassed = Math.floor(currentTime / 60) || '0'
        let secondPassed = Math.floor(currentTime % 60) || '0'

        let minuteTotal = Math.floor(duration / 60) || '0'
        let secondTotal = Math.floor(duration % 60) || '0'

        audioTimePassed.textContent = `${addZero(minutePassed)}: ${addZero(secondPassed)}`
        audioTimeTotal.textContent = `${addZero(minuteTotal)}: ${addZero(secondTotal)}`
    })

    audioProgress.addEventListener('click', event => {
        const x = event.offsetX
        const allWidth = audioProgress.clientWidth
        const progress = (x / allWidth) * audioPlayer.duration
        audioPlayer.currentTime = progress
    })

    audioPlayer.addEventListener('ended', () => {
        nextTrack()
        audioPlayer.play()
    })
}

export default MusicPlayerInit