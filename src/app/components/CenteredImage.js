// components/CenteredImage.js
import Image from 'next/image';
import styles from '../styles/CenteredImage.module.css';

const CenteredImage = ({ src, alt }) => {
  return (
    <div className={styles.container}>
      <Image src={src} alt={alt} layout="intrinsic" width={300} height={300} />
    </div>
  );
};

export default CenteredImage;
