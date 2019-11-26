import { observable, action } from 'mobx'
import { convertSecondsToMinutes } from '@features/player/utilities'

export default class PlayerStore {
  @observable
  nowPlaying = {
    playing: false,
    title: '',
    subTitle: '',
    image: '',
    url: '',
    indexInQueue: null,
    isLooping: false,
  }

  @observable
  progressBarProcessing = {
    timeElapsed: '0:00',
    progress: 0,
    duration: '0:00',
  }

  @observable
  queueSong = []

  @observable
  instReactPlayer = null

  @action
  play(track) {
    const { previewUrl, name, artist, image, indexInQueue = null } = track
    this.nowPlaying.playing = true
    this.nowPlaying.title = name
    this.nowPlaying.subTitle = artist
    this.nowPlaying.image = image
    this.nowPlaying.url = previewUrl
    this.nowPlaying.indexInQueue = indexInQueue
    if (indexInQueue === null) {
      this.queueSong = [track]
    }
  }
  @action
  toggleLooping() {
    this.nowPlaying.isLooping = !this.nowPlaying.isLooping
  }
  @action
  toggle() {
    this.nowPlaying.playing = !this.nowPlaying.playing
  }
  @action
  updateProgressBar(playerStatus) {
    const { playedSeconds, loadedSeconds, played } = playerStatus
    if (played === 1) return false
    this.progressBarProcessing.timeElapsed = convertSecondsToMinutes(
      playedSeconds,
    )
    this.progressBarProcessing.progress = played
    this.progressBarProcessing.duration = convertSecondsToMinutes(loadedSeconds)
  }
  gotoNextPrevSong(direction = 'next', callback = () => false) {
    if (this.nowPlaying.indexInQueue !== null) {
      const currIndex = this.nowPlaying.indexInQueue
      let nextIndex = direction === 'next' ? currIndex + 1 : currIndex - 1

      if (
        (nextIndex === this.queueSong.length || nextIndex === -1) &&
        this.nowPlaying.isLooping
      ) {
        nextIndex = direction === 'next' ? 0 : this.queueSong.length - 1
      } else if (
        (nextIndex === this.queueSong.length || nextIndex === -1) &&
        !this.nowPlaying.isLooping
      ) {
        return callback()
      }
      this.play(this.queueSong[nextIndex])
    }
  }
  @action
  handleEndSong() {
    if (this.nowPlaying.indexInQueue !== null) {
      this.gotoNextPrevSong('next', () => {
        this.updateProgressBar({
          playedSeconds: 0,
          loadedSeconds: 0,
          played: 0,
        })
      })
    } else {
      // seek to 0
      this.updateProgressBar({ playedSeconds: 0, loadedSeconds: 0, played: 0 })
    }
  }

  @action
  handleActionInQueue(operation = 'next') {
    if (this.nowPlaying.indexInQueue !== null) {
      this.gotoNextPrevSong(operation)
    }
  }
  @action
  addToQueue(track) {
    track.indexInQueue = this.queueSong.length
    this.queueSong = this.queueSong.concat([track])
  }
  @action
  handleClickProgressBar(progessValue) {
    // this.progressBarProcessing.progress = progessValue
    this.instReactPlayer.seekTo(progessValue)
  }
  @action
  setInstPlayer(instReactPlayer) {
    this.instReactPlayer = instReactPlayer
  }
}
