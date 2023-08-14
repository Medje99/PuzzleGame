import React from 'react'
import { useContext } from 'react'
import GameContext from '../context/GameContext'


function Header() {

    const {shuffleArray,time,btn,isDisabled} = useContext(GameContext)


    const startBtn = {
        display: btn ? 'none' : 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isDisabled ? 'not-allowed' : 'default'
    }

   
    const resetBtn = {
        display: btn ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
    <div className='startGame'>
        <div className='btn'>
            <button onClick={shuffleArray} style={startBtn} disabled={isDisabled}>Start</button>
            <button onClick={() => window.location.reload(false)} style={resetBtn} >Click to reload!</button>

        </div>
        <div className='time'>
            <span>Timer: {time.seconds.toString().padStart(2, '0')}s {time.milliseconds.toString().padStart(3, '0')}ms  </span>
        </div>  
    </div>

)
}

export default Header