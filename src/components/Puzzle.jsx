import React from 'react'
import Card from './Card'
import { useContext } from 'react'
import GameContext from '../context/GameContext'

function Puzzle() {

  const {game} = useContext(GameContext)


  const style = {
    display: game ? 'flex' : 'none',
  }

  return (
    <div className='puzzle' style={style}>
        <Card/>
    </div>
  )
}

export default Puzzle