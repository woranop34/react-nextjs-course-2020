import * as API from './repository'

export function getNewReleases({ token, limit }) {
  return API.getNewReleases({ token, limit })
}

export function getAlbumById(id, { token }) {
  return API.getAlbumById(id, { token }).then(response => {
    response.title = response.name
    response.subTitle = response.artists.map(artist => artist.name).join(',')
    response.image = response.images[0].url
    response.bottomLine = `${new Date(response.release_date).getFullYear()} • ${
      response.total_tracks
    } SONGS`
    response.tracks.items = response.tracks.items.map(item => {
      item.artistsName = item.artists.map(artist => artist.name).join(',')
      item.previewUrl = item.preview_url
      item.artist = item.artistsName
      item.image = response.image
      item.album = response.name
      item.durationMs = item.duration_ms
      return item
    })
    return response
  })
}
