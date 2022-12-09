import { useEffect, useState, } from 'react'
import styles from '../styles/Home.module.css'

export const RiddleDescription = (props) => {
  const [reload, setreload] = useState(false);

  useEffect(() => {
    reload && window.location.reload();
      
    function descriptionMargin(x) {
      const main = document.getElementByTagName('main')
      var x = window.matchMedia("(max-width: 914px)")
      if (x.matches) {
          main.style.marginBottom = '70rem !important';
        }
      }
    descriptionMargin(x)
    x.descriptionMargin(descriptionMargin)
  })

    return (
        <main id={styles.index} className={'py-3 d-flex justify-content-center mb-3'}>
            <canvas className={'position-absolute'} id="cvs"></canvas>
            <div className={'glass col-6'}>
                <h1 className={'text-center text-white'}>THE FOX, CHICKEN, AND CORN</h1>
                <h5 className={'p-3 text-white'}>
                    A farmer has to get a fox, a chicken, and GMO corn across a river.<br></br>
                    He has a rowboat, and it can only carry him and one other thing.<br></br><br></br>
                    
                    If the fox and the chicken are left together, the fox will eat the chicken.<br></br>
                    If the chicken and the corn are left together, the chicken will eat the corn.<br></br><br></br>

                    How does the farmer do it?
                </h5>
                <button className={'bt-color m-3 mb-4 p-2'} 
                    onClick={() => setreload(true)}>Try Again</button>
            </div>
        </main>
    )
}
