/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useRef, useEffect } from 'react';
import html from '../img/html.png';
import css from '../img/css.png';
import js from '../img/js.png';
import react from '../img/react.png';
import sass from '../img/sass.png';
import ts from '../img/ts.png';
import nodejs from '../img/nodejs.png';
import mangodb from '../img/mangodb.png';

const GameContext = createContext()

export const GameProvider = ({children}) => {
  
  const [pictures, setPictures] = useState([html, react, css, js, sass, ts, nodejs, mangodb, html, react, css, js, sass, ts, nodejs, mangodb]);
    
  const divRefs = useRef([]);

    
  const [btn,setBtn] = useState(false)

  
  const [selectedPics, setSelectedPics] = useState([]);
  const [currentSrc,setCurrentSrc] = useState([])
  const [game,setGame] = useState(false)
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState({ seconds: 0, milliseconds: 0 });
  const [isDisabled,setIsDisabled] = useState(false)


  useEffect(() => { 
    let timerId;

    if (running) {
      timerId = setInterval(() => {
        setTime(prevTime => {
          const milliseconds = prevTime.milliseconds + 10;

          if (milliseconds === 1000) {
            return { seconds: prevTime.seconds + 1, milliseconds: 0 };
          }

          return { seconds: prevTime.seconds, milliseconds };
        });
      }, 10);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [running]);


  const shuffleArray = () => {
    setGame(true)
    setRunning(true)
    setIsDisabled(true)
    const shuffledArray = [...pictures]; 

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; 
    }

    setPictures(shuffledArray);
  };


  const handleClickPic = (id,pic) => {

    if (selectedPics.length === 2) {
      setSelectedPics([id]);
      setCurrentSrc([pic])

    } else if (selectedPics.includes(id)) {
      setSelectedPics((prevSelected) => prevSelected.filter((picId) => picId !== id));
      setCurrentSrc((prevSrc) => prevSrc.filter((picSrc) => picSrc !== pic));
    } else{
      setSelectedPics((prevSelected) => [...prevSelected, id]);
      setCurrentSrc([...currentSrc, pic])

    }
  };

  
  const compareSelectedPics = () => {
    let finishedGame = true;


    if (currentSrc.length === 2) {
      if(currentSrc[0] === currentSrc[1]){
        const activeDivs = divRefs.current.filter((ref) => ref.className.match(/_active/));
        activeDivs.forEach((div) => {
          div.style.backgroundColor = 'transparent'
          div.style.visibility = 'hidden';
        });
        
      } else{
        setTimeout(() =>{
          setSelectedPics([]);
          setCurrentSrc([])
        },300)
      }
     
    }


    for (let i = 0; i < divRefs.current.length; i++) {
      const div = divRefs.current[i];
      const computedStyles = getComputedStyle(div);

      if (computedStyles.getPropertyValue('visibility') !== 'hidden') {
        finishedGame = false;
        break;
      }
    }

    if (finishedGame) {
      alert(`You finished game in ${time.seconds + ' seconds and ' + time.milliseconds + ' ms'}`);
      setRunning(false);
      setBtn(true)
    } 

  };

  useEffect(() => {
    compareSelectedPics();
  }, [selectedPics]);


  return <GameContext.Provider value={{
        handleClickPic,
        shuffleArray,
        pictures,
        selectedPics,
        divRefs,
        game,
        time,
        btn,
        isDisabled
        
    }}>
        {children}
    </GameContext.Provider>
}

export default GameContext