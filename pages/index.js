import styles from '../styles/Home.module.css'
import { useMemo, useCallback, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import BoatFarmer from '../components/boatFarmer'
import { RiddleDescription } from '../components/riddleDescription'
import Particles from '../components/particles'
import chicken from '../public/images/chicken.png'
import corn from '../public/images/corn.png'
import fox from '../public/images/fox.png'
import poof from '../public/images/poof.png'
import placeholder from '../public/images/placeholder.png'
import { NearShore } from '../components/nearShore'
import { FarShore } from '../components/farShore'
import gsap from 'gsap'

export default function Home() {
  const [nearShoreScene, setNearShoreScene] = useState([
    {
      img: chicken,
      alt: 'chicken',
      id: 'chik',
    },
    {
      img: corn,
      alt: 'corn',
      id: 'co',
    },
    {
      img: fox,
      alt: 'fox',
      id: 'fo',
    }
  ]);

  const [inBoatNearShore, setInBoatNearShore] = useState(null)
  const [inBoatFarShore, setInBoatFarShore] = useState(null)
  const [farShoreScene, setFarShoreScene] = useState([])
  const [isClickedNearShore, setIsClickedNearShore] = useState(false)
  const [isClickedFarShore, setIsClickedFarShore] = useState(false)
  const [gameOff, setGameOff] = useState(true)
  const [gameGuide, setGameGuide] = useState({
    animals: false,
    farmer: true,
  })

  useEffect(() => {
    snow()
  }, []);
  
  const value = 0;
  const snow = useCallback(() => {Particles()}, [value]);

  const clickedItemNearShore = (event, idAnimate) => {
    
    gameGuide.farmer === true
    ? setGameGuide({
      ...gameGuide,
      animals: true,
      farmer: false
    })
    : setGameGuide({
      ...gameGuide,
      animals: true,
      farmer: 'no more'
    })
    
    setIsClickedNearShore(true)

    const id = event.target.id
    const newSceneNearShore = [...nearShoreScene]
    
    const death = () => {
        newSceneNearShore.splice(id -1, 1, {
        img: poof,
        alt: 'death cloud'
      })
    }

    const putInBoatNearShore = () => {
      gsap.to(`#${idAnimate}`, {rotation: 27, x: 100, duration: 1,
        onComplete() {
          newSceneNearShore.splice(id, 1, {
          img: placeholder,
          alt: 'placeholder'
        })
        setInBoatNearShore(nearShoreScene[id])
        }                       
      })
    }

    if (id === 'co' || id === 'fo') {
      if(farShoreScene.length > 0 ) {
        putInBoatNearShore() 
      } else {
        death()
      }       
    } else if (id === 'chik') {
      putInBoatNearShore()
    } 
    setNearShoreScene(newSceneNearShore)
  }

  const clickedItemFarShore = (event) => {
    setIsClickedNearShore(true)
    
    const id = event.target.id
    const newSceneFarShore = [...farShoreScene]

    const inBoatFarShore = () => {
      newSceneFarShore.splice(id, 1)
      setInBoatFarShore(farShoreScene[id])
      setFarShoreScene(newSceneFarShore)
    }
    inBoatFarShore()
  }

  return (
    <div className={'landscape main-height'}> 
      <canvas className={'position-absolute'} id="cvs"></canvas>
      {gameOff && <RiddleDescription />}
      <div id={styles.main} className={'d-flex justify-content-between'}>
        <div className={'d-flex justify-content-start align-items-end'}>
          <NearShore 
            nearShoreScene={nearShoreScene}
            setNearShoreScene={setNearShoreScene}
            setInBoatNearShore={setInBoatNearShore}
            clickedItemNearShore={clickedItemNearShore}
            isClickedNearShore={isClickedNearShore}
            setGameOff={setGameOff}
            gameGuide={gameGuide}
          />
          <BoatFarmer 
            nearShoreScene={nearShoreScene}
            setNearShoreScene={setNearShoreScene}
            inBoatNearShore={inBoatNearShore}
            setInBoatNearShore={setInBoatNearShore}
            farShoreScene={farShoreScene}
            setFarShoreScene={setFarShoreScene}
            inBoatFarShore={inBoatFarShore}
            setInBoatFarShore={setInBoatFarShore}
            isClickedNearShore={isClickedNearShore}
            setIsClickedNearShore={setIsClickedNearShore}
            isClickedFarShore={isClickedFarShore}
            setIsClickedFarShore={setIsClickedFarShore}
            gameGuide={gameGuide}
            setGameGuide={setGameGuide}
          />
        </div>
        <FarShore 
          farShoreScene={farShoreScene}
          inBoatNearShore={inBoatNearShore}
          setInBoatNearShore={setInBoatNearShore}
          clickedItemFarShore={clickedItemFarShore}
          isClickedFarShore={isClickedFarShore}
        />
      </div>
    </div>
  )
}
