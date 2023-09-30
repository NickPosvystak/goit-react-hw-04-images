
export const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  onClick,
}) => {
  return (
    <li className="gallery-item">
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => {
          onClick(largeImageURL, tags);
        }}
      />
    </li>
  );
};
