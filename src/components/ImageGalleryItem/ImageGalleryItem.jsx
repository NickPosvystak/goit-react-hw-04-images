import { Component } from 'react';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, onClick }) => {
  return (
    <li class="gallery-item">
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

