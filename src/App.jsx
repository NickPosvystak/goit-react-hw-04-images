import { useState } from 'react';
import { fetchImages } from 'services/api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from './components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import Notiflix from 'notiflix';
import css from './App.module.css';
import { useEffect } from 'react';

export const App = () => {
  const [image, setImage] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreBtn, setIsMoreBtn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState({});
  // const [error, setError] = useState(false);

  const perPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      if (query === '') {
        Notiflix.Notify.failure('Sorry, the field is empty. Please try again.');
        return;
      }
      try {
        setIsLoading(true);

        const result = await fetchImages(query, page, perPage);
        const data = result.hits;

        setImage(prevImages => [...prevImages, ...data]);
        setIsMoreBtn(result.totalHits >= perPage * page);

        if (data.length === 0 && page === 1) {
          Notiflix.Notify.failure(
            'Oops! There are no images that match your request!'
          );
        }

        if (page === 1 && data.length !== 0) {
          Notiflix.Notify.success(
            `Hooray! We found ${result.totalHits} images.`
          );
        }
      } catch (error) {
        // setError(true);
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, query]);

  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setImage([]);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setIsMoreBtn(true);
  };

  const showModalImage = image => {
    setModalImage(image);
    setIsModalOpen(true);
    setIsLoading(true);
  };

  const closeModal = e => {
    setModalImage({});
    setIsModalOpen(false);
    setIsLoading(false);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      {image.length !== 0 && (
        <ImageGallery images={image} showModalImage={showModalImage} />
      )}
      {isLoading && <Loader />}
      {isMoreBtn && <Button onLoadMore={onLoadMore} />}
      {isModalOpen && <Modal largeImage={modalImage} onClose={closeModal} />}
    </div>
  );
};
