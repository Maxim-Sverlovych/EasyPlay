const VideoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player')
    const videoButtonPlay = document.querySelector('.video-button__play')
    const videoButtonStop = document.querySelector('.video-button__stop')
    const videoTimePassed = document.querySelector('.video-time__passed')
    const videoProgress = document.querySelector('.video-progress')
    const videoTimeTotal = document.querySelector('.video-time__total')

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause')
            videoButtonPlay.classList.add('fa-play')
        } else {
            videoButtonPlay.classList.add('fa-pause')
            videoButtonPlay.classList.remove('fa-play')
        }
    }

    const togglePlayHandler = () => {
        videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause()
        toggleIcon()
    }

    const stopPlayHandler = () => {
        videoPlayer.pause()
        videoPlayer.currentTime = 0
    }

    videoPlayer.addEventListener('click', togglePlayHandler)
    videoButtonPlay.addEventListener('click', togglePlayHandler)

    videoPlayer.addEventListener('play', toggleIcon)
    videoPlayer.addEventListener('pause', toggleIcon)

    const addZero = n => n < 10 ? '0' + n : n   //Check minute and second of zero

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime
        const duration = videoPlayer.duration

        let minutePassed = Math.floor(currentTime / 60)
        let secondPassed = Math.floor(currentTime % 60)

        let minuteTotal = Math.floor(duration / 60)
        let secondTotal = Math.floor(duration % 60)

        videoProgress.value = (currentTime / duration) * 100

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondPassed)}`
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondTotal)}`
    })

    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration
        const value = videoProgress.value

        videoPlayer.currentTime = (value * duration) / 100
    })

    videoButtonStop.addEventListener('click', stopPlayHandler)
}

export default VideoPlayerInit