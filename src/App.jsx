import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';
import { fetchImages } from 'services/api';

export class App extends Component {
  state = {
    images: null,
    query: '',
    page: 1,
    showModal: 'false',
    isLoading: 'false',
    error: null,
    showLoadBtn: 'false',
    total: 0,
    perPage: 12,
    largeImageURL: '',
    imageTags: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if ((query && prevState.query !== query) || page > prevState.page) {
      this.searchImages(query, page);
    }
    if (prevState.query !== query) {
      this.setState({ images: [] });
    }
  }

  searchImages = async () => {
    const { query, page, perPage } = this.state;
    this.setState({ isLoading: true });
    try {
      const data = await fetchImages(query, page, perPage);
      if (data.hits.length === 0) {
        this.setState({ showLoadBtn: false });
        alert('No images found');
        return;
      }
      this.setState(({ images }) => {
        return {
          images: [...images, ...data.hits],
          total: data.totalHits,
        };
      });
      if (data.hits.length > 0 && page === 1) {
        alert(`We found ${data.totalHits} images`);
      }
      if (data.hits.length < perPage) {
        this.setState({ showLoadBtn: false });
        alert("We're sorry, but you've reached the end of search results.");
      } else {
        this.setState({ showLoadBtn: true });
      }
    } catch (error) {
      this.setState({ error: error });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  

  // fetchAllImages = async () => {
  //   try {
  //     const images = await fetchImages();
  //     this.setState({ images: images });
  //     console.log('images: ', images);

  //   } catch (error) {
  //     this.setState({error: error.messsage});
  //   }
  //   finally{this.setState({isLoading: false})}  };
  // componentDidMount() {
  //   this.fetchAllImages();
  // }
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
