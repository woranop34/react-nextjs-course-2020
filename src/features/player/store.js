import { observable, action } from 'mobx'
import { convertSecondsToMinutes } from '@features/player/utilities'

export default class PlayerStore {
  @observable
  // nowPlaying = {
  //   playing: false,
  //   title: 'ไกลแค่ไหน คือ ใกล้',
  //   subTitle: 'Getsunova',
  //   image: 'https://i.scdn.co/image/ab67616d0000b273e76e64aa449965dd5e439c53',
  //   url:
  //     'https://p.scdn.co/mp3-preview/f0521c21357ae522872b59cf4dd082ad65880fe8?cid=e4abb1ea8fdf4926a463960abd146fcb',
  // }
  nowPlaying = {
    playing: false,
    title: '',
    subTitle: '',
    image: '',
    url: '',
    indexInQueue: null,
  }
  @observable
  progressBarProcessing = {
    timeElapsed: '0:00',
    progress: 0,
    duration: '0:00',
  }
  @observable
  queueSong = []

  @action
  play(track) {
    const { previewUrl, name, artist, image, indexInQueue = null } = track
    this.nowPlaying.playing = true
    this.nowPlaying.title = name
    this.nowPlaying.subTitle = artist
    this.nowPlaying.image = image
    this.nowPlaying.url = previewUrl
    this.nowPlaying.indexInQueue = indexInQueue
    console.log('Now Playing:', indexInQueue)
  }
  @action
  replay() {
    console.log('replay')
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
  @action
  clearProgressBar() {
    this.updateProgressBar({ playedSeconds: 0, loadedSeconds: 0, played: 0 })
  }
  @action
  addToQueue(track) {
    track.indexInQueue = this.queueSong.length
    console.log(track)
    this.queueSong = this.queueSong.concat([track])
  }
}
