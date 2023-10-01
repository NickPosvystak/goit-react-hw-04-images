import { Component } from 'react';
import { fetchImages } from 'services/api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import  { Button } from './components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import Notiflix from 'notiflix';
import css from './App.module.css'

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    isMore: false,
    isModal: false,
    modalImage: {},
    error: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    const perPage = 12;
    if (this.state.query === '') {
      return Notiflix.Notify.failure(
        'Sorry, the field is empty. Please try again.'
      );
    }

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });

        const result = await fetchImages(query, page, perPage);
        const data = result.hits;
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...data],
            isMore: true,
          };
        });
        if (result.totalHits < perPage * page && page !== 1) {
          this.setState({ isMore: false });
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
        }
        if (data.length < perPage && page === 1) {
          this.setState({ isMore: false });
        }
        if (data.length === 0 && page === 1) {
          Notiflix.Notify.failure(
            'Oops! There are no images that match your request!'
          );
          this.setState({ isMore: false });
        }
        if (page === 1 && data.length !== 0) {
          Notiflix.Notify.success(
            `"Hooray! We found ${result.totalHits} images."`
          );
        }
      } catch (error) {
        this.setState({ error: true });
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSubmit = query => {
    this.setState({
      query: query,
      page: 1,
      images: [],
    });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1, isMore: false };
    });
  };

  showModalImage = image => {
    this.setState({
      modalImage: image,
      isModal: true,
    });
  };
  closeModal = e => {
    this.setState({
      modalImage: {},
      isModal: false,
    });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.images.length !== 0 && (
          <ImageGallery
            images={this.state.images}
            showModalImage={this.showModalImage}
          />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.isMore && <Button onLoadMore={this.onLoadMore} />}
        {this.state.isModal && (
          <Modal largeImage={this.state.modalImage} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}