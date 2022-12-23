import Image from 'next/image'
import {useState} from 'react'

export const NearShore = (props) => {
  const [clicked, setClicked] = useState(false)
  
  return (
    <div className={'d-flex justify-content-start align-items-end item'}
    // onClick={() => props.setGameOff(false)}
    >
      {props.nearShoreScene.map(item => {
        return (
          {!clicked && <div onClick={setClicked(true)}>Click one</div>}
          <Image 
            id={item.id}
            key={item.id}
            src={item.img} 
            alt={item.alt} 
            width={130}
            height={150}
            onClick={event => props.isClickedNearShore
              ? event.preventDefault()
              : props.clickedItemNearShore(event)
            }
            className={item.alt === 'placeholder'
              ? 'hidden'
              : null
            }
          />
        )
      })}  
    </div>
  )
}

