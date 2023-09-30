import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';
import { fetchImages } from 'services/api';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    showModal: 'false',
    isLouding: 'false',
    error: null,
  };

  fetchAllImages = async () => {
    try {
      const hits = await fetchImages();
      this.setState({ hits: hits });
      console.log('hits: ', hits);
    } catch (error) {}
  };
  componentDidMount() {
    this.fetchAllImages();
  }
  onHandlerSubmit = query => {
    this.setState(prevState => {
      if (prevState.query === query) {
        return;
      } else
        return {
          query,
          page: 1,
        };
    });
  };
  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    // const showHits = Array.isArray(this.state.hits) && this.state.hits.length;
    return (
      <>
        <Searchbar onSubmit={this.onHandlerSubmit} />
        <ImageGallery images={this.state.images} onClick={this.showModal} />

        {/* <ul>
          {showHits &&
            this.state.hits.map(hit => {
              return (
                <li>
                  <span>id: {hit.id}</span>
                  <p>tag: {hit.tags}</p>
                </li>
              );
            })}
        </ul> */}
      </>
    );
  }
}
