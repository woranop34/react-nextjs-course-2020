import React, { useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
// import PlayerStore from '@features/player/store'
import { inject } from '@lib/store'
export default inject('playerStore')(Player)

function Player({ playerStore }) {
  // const playerStore = new PlayerStore()
  const { url, playing } = playerStore.nowPlaying
  const instPlayer = useRef(null)
  useEffect(() => {
    playerStore.setInstPlayer(instPlayer.current)
  }, [])

  return (
    <ReactPlayer
      ref={instPlayer}
      css={{ display: 'none' }}
      playing={playing}
      url={url}
      progressInterval={50}
      volume={0.8}
      muted={false}
      onProgress={data => {
        playerStore.updateProgressBar(data)
      }}
      onEnded={() => {
        playerStore.handleEndSong()
      }}
    />
  )
}
