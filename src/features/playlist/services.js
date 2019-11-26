import * as API from './repository'

export function getPlaylistById(id, { token }) {
  return API.getPlaylistById(id, { token }).then(response => {
    response.title = response.name
    response.subTitle = response.owner.display_name
    response.image = response.images[0].url
    response.bottomLine = `${response.tracks.total} SONGS`

    response.tracks.items = response.tracks.items.map(item => {
      item.track.artistsName = item.track.artists
        .map(artist => artist.name)
        .join(',')
      item.track.previewUrl = item.track.preview_url
      item.track.title = item.track.name
      item.track.subTitle = item.track.artistsName
      item.track.albumName = item.track.album.name
      item.track.artist = item.track.artistsName
      item.track.image = item.track.album.images[0].url
      item.track.album = item.track.name
      item.track.durationMs = item.track.duration_ms

      return item.track
    })

    return response
  })
}

export function getMyPlaylist({ token }) {
  return API.getMyPlaylist({ token }).then(response => {
    return response
  })
}
