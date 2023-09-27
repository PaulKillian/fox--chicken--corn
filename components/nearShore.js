import Image from 'next/image'

export const NearShore = (props) => {
  return (
    <div className={'d-flex justify-content-start align-items-end item position-absolute bottom-0 z'}
    // onClick={() => props.setGameOff(false)}
    >
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
  )
}