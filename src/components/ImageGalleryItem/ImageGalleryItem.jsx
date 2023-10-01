import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({
  id,
  webformatImage,
  largeImage,
  showModalImage,
  description,
}) => {
  return (
    <li key={id} className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={webformatImage}
        onClick={() => showModalImage(largeImage)}
        alt={description}
      />
    </li>
  );
};