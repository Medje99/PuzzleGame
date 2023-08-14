import React, { useContext } from 'react';
import GameContext from '../context/GameContext';

function Card() {
  
  const {pictures,selectedPics,handleClickPic,divRefs} = useContext(GameContext)

 
 
  return (
    <>
      {pictures.map((pic, id) => (
        <div
          className={`card_${id}${selectedPics.includes(id) ? '_active' : ''}`}
          key={id}
          name={pic}
          onClick={(e) => handleClickPic(id,pic,e)}
          ref={(el) => (divRefs.current[id] = el)}
        >
          <img src={pic} width={150} height={150} alt={`card_${id}`} 
          />
        </div>
      ))}
    </>
  );
}

export default Card;
