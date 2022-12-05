import { FC } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import styles from './ProductSlideshow.module.css';

interface Props {
    images: string[];
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
    <div>
        <Slide
            easing='ease'
            duration={7000}
            indicators
        >
         {images.map((image, index)=> (
            <div className={styles['each-slide-effect']} key={index}>
              <div style={{'backgroundImage': `url(/products/${image})`}} />
            </div>
          ))} 
        </Slide>
      </div>
  )
}
