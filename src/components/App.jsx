import React, { Component } from "react";
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { getImages } from 'components/ImagesAPI/imagesApi';
import { ButtonLoadMore } from './ButtonLoadMore/ButtonLoadMore';

export class App extends Component {
  state = {
    isSubmitted: false,
    inputValue: '',
    response: { data: { hits: [], totalHits: 0 } },
    error: null,
    page: 1,
    isLoading: false
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isSubmitted: true, error: null, response: { data: { hits: [], totalHits: 0 } }, page: 1, isLoading: true }, () => {
      this.fetchImages();
    });
  };

  loadMore = async () => {
    this.setState((prev) => ({ page: prev.page + 1 }), () => {
      this.fetchImages();
    });
  };

  fetchImages = async () => {
    try {
      const response = await getImages(this.state.inputValue, this.state.page);
      this.setState((prev) => ({
        response: {
          data: {
            hits: [...prev.response.data.hits, ...response.data.hits],
            totalHits: response.data.totalHits
          },
        },
        isLoading: false,
      }));
    } catch (error) {
      this.setState({ error });
      console.log(error);
    }
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    const { isSubmitted, response, error, isLoading } = this.state;
    const { hits, totalHits } = response.data;
    const showLoadMoreButton = hits.length < totalHits;

    return (
      <div>
        <SearchBar handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
        {isSubmitted && !error && (
          <>
            <ImageGallery
              isSubmitted={isSubmitted}
              response={response}
              isLoading={isLoading}
              fetchImages={this.fetchImages}
            />
            {showLoadMoreButton && (
              <ButtonLoadMore loadMore={this.loadMore} />
            )}
          </>
        )}
      </div>
    );
  }
}