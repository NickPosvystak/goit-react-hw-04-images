import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, showModalImage }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          webformatImage={image.webformatURL}
          showModalImage={showModalImage}
          largeImage={image.largeImageURL}
          description={image.tags}
          loading="lazy"
        />
      ))}
    </ul>
  );
};
