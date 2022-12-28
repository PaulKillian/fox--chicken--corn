import styles from '../styles/BoatFarmer.module.css'
import boat from '../public/images/boat.png'
import farmer from '../public/images/farmer.png'
import poof from '../public/images/poof.png'
import Image from 'next/image'
import gsap from 'gsap'

function BoatAndFarmer(props) {
  const sendBoatToFarShore = () => {
    props.setGameGuide(props.gameGuide.farmer = true)
    props.setIsClickedNearShore(true)
    var tl = gsap.timeline();
    tl.to(".boat-container", {
      duration: 2, x: 559,
      onComplete() {
        props.setFarShoreScene([
          ...props.farShoreScene,
          props.inBoatNearShore
        ])
        props.setInBoatNearShore(null)
        props.setIsClickedFarShore(false)
        tl.to(".boat-container", 
          {rotationY: 180, x: 559, duration: 1});
      }
    })
  }

  const sendBoatToNearShore = () => {
    const newSceneNearShore = [...props.nearShoreScene]
    const newSceneFarShore = [...props.farShoreScene]
    props.setIsClickedFarShore(false)

    const death = () => {
      newSceneFarShore[1].alt === 'fox'
          ? newSceneFarShore.splice(0, 1, {
              img: poof,
              alt: 'death cloud'
          })
          : newSceneFarShore.splice(1, 1, {
            img: poof,
            alt: 'death cloud'
          })
      props.setFarShoreScene(newSceneFarShore)
      props.setIsClickedFarShore(false)
    }
    
    if(props.farShoreScene.length > 1 && props.inBoatFarShore === null
      && props.nearShoreScene[0].alt !== 'chicken') {
      death()
    } else {
      props.setIsClickedFarShore(true)

      var tl = gsap.timeline();
      tl.to(".boat-container", {
      duration: 2, x: 0,
      onComplete() {
        if(!props.inBoatFarShore) {
          props.setIsClickedNearShore(false)
          tl.to(".boat-container",
            {rotationY: 360, x: 0, duration: 1});
            return
        } else {
          newSceneNearShore.splice(props.inBoatFarShore.id, 1, {
            img: props.inBoatFarShore.img,
            alt: props.inBoatFarShore.alt,
            id: props.inBoatFarShore.id
          })
          props.setNearShoreScene(newSceneNearShore)
          props.setInBoatFarShore(null)
          props.setIsClickedNearShore(false)
          tl.to(".boat-container", 
            {rotationY: 360, x: 0, duration: 1});
        }
      }})
    }
  }

  const sendBoat = () => {
      if (props.inBoatNearShore) {
          sendBoatToFarShore()
      } else if (props.farShoreScene) {
          sendBoatToNearShore()
      }
  }

  return (
      <div className={'boat-container'} 
        onClick={sendBoat}>
          <div id={'boat'} className={'position-relative d-flex flex-column justify-content-end float'}>
              <div className={'position-relative farmer-position'}>
                  <Image
                  src={farmer} 
                  alt="The farmer" 
                  width={200}
                  height={280}
                  />
              </div>               
              <div className={styles.boatPosition}>
                  <Image className={'shadow'} 
                  src={boat} 
                  alt="The row boat" 
                  width={200}
                  height={50}
                  />
              </div>
              {props.inBoatNearShore &&
                <div className={'position-absolute'}>
                    <Image
                      id={props.inBoatNearShore.id}
                      key={props.inBoatNearShore.id}
                      src={props.inBoatNearShore.img} 
                      alt={props.inBoatNearShore.alt} 
                      width={130}
                      height={150}
                    />
                  </div>
              }
              {props.inBoatFarShore &&
                <div className={'position-absolute'}>
                  <Image
                      id={props.inBoatFarShore.id}
                      key={props.inBoatFarShore.id}
                      src={props.inBoatFarShore.img} 
                      alt={props.inBoatFarShore.alt} 
                      width={130}
                      height={150}
                  />
                </div>
              }
          </div>
      </div>
    )
}

export default BoatAndFarmer;
