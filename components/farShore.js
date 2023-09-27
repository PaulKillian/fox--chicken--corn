import Image from 'next/image'

export const FarShore = (props) => {    
    if (props.farShoreScene) {
      return (
        <div className={'d-flex justify-content-end align-items-end item fixed-bottom z-1'}>
          {props.farShoreScene.map(item => {
            return (
              <Image
                id={item.id}
                key={item.id}
                src={item.img} 
                alt={item.alt} 
                width={130}
                height={150}
                onClick={event => props.isClickedFarShore
                    ? event.preventDefault()
                    : props.clickedItemFarShore(event)
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
    } else {
        return (
          null
        )
    }

}