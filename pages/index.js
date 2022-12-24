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

export default function Home() {
  const [nearShoreScene, setNearShoreScene] = useState([
    {
      img: chicken,
      alt: 'chicken',
      id: '0',
    },
    {
      img: corn,
      alt: 'corn',
      id: '1',
    },
    {
      img: fox,
      alt: 'fox',
      id: '2',
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
    farmer: false,
  })

  useEffect(() => {
    snow()
  }, []);
  
  const value = 0;
  const snow = useCallback(() => {Particles()}, [value]);

  const clickedItemNearShore = (event) => {
    setGameGuide(gameGuide.animals = true)
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
      newSceneNearShore.splice(id, 1, {
        img: placeholder,
        alt: 'placeholder'
      })
      setInBoatNearShore(nearShoreScene[id])
    }

    if (id === '1' || id === '2') {
      console.log(nearShoreScene[0].alt)
      if(farShoreScene.length > 0 ) {
        putInBoatNearShore() 
      } else {
        death()
      }       
    } else if (id === '0') {
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
