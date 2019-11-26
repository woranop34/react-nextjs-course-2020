import React from 'react'
import { Flex, Box } from '@grid'
import colors from '@features/_ui/colors'

// import PlayerStore from '@features/player/store'
import { inject } from '@lib/store'

export default inject('playerStore')(NowPlaying)

function NowPlaying({ playerStore }) {
  // const playerStore = new PlayerStore()
  const { image, title, subTitle } = playerStore.nowPlaying

  return (
    <Flex
      css={{
        padding: '0 15px',
      }}>
      <Box css={{ paddingRight: '15px' }}>
        <img src={image} alt="" css={{ width: '55px', height: '55px' }} />
      </Box>
      <Box>
        <Flex
          css={{
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Box>
            <h3 css={{ color: colors.link, fontSize: '0.9em' }}>{title}</h3>
          </Box>
          <Box>
            <small css={{ fontSize: '0.8em' }}>{subTitle}</small>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

// export default NowPlaying
