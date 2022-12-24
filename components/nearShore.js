import Image from 'next/image'
import {useState} from 'react'
import styles from 'Home.module.css'

export const NearShore = (props) => {

  return (
    <div>
      {props.gameGuide === false && <h1 className={styles.color}>Click one</h1>}
      <div className={'d-flex justify-content-start align-items-end item'}>
        {props.nearShoreScene.map(item => {
          return (     
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
    </div>
  )
}

