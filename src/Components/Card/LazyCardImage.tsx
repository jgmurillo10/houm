import React, {useState, useEffect, useRef} from 'react';
import { CardMedia, Skeleton } from '@mui/material';

interface CardMediaI {
  component: string,
  image: string,
  alt: string,
  height: string,
  onError: React.EventHandler<any>,
}

const LazyCardImage = (props: CardMediaI) => {
  const [visible, setVisible] = useState<boolean>(false);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible && placeholderRef.current) {
      const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
        if (intersectionRatio > 0) {
          setVisible(true);
        }
      });
      observer.observe(placeholderRef.current);
      return () => observer.disconnect();
    }
  }, [visible, placeholderRef]);

  return (visible
    ?
    <CardMedia
      onError={props.onError}
      component='img'
      image={props.image}
      alt={props.alt}
      height={props.height}
    />
    :
    <Skeleton sx={{ height: 190 }} animation='wave' variant='rectangular' ref={placeholderRef}  />
    // <div style={{height: props.height, backgroundColor: '#EEE'}} aria-label={props.alt} ref={placeholderRef} />
  );
};

export default LazyCardImage;
