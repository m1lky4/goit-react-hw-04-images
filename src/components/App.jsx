import React, { useState, useEffect } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'components/ImagesAPI/imagesApi';
import { ButtonLoadMore } from './ButtonLoadMore/ButtonLoadMore';

export const App = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState({
    data: { hits: [], totalHits: 0 },
  });
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchImages = async () => {
    try {
      const response = await getImages(inputValue, page);
      setResponse(prevResponse => ({
        data: {
          hits: [...prevResponse.data.hits, ...response.data.hits],
          totalHits: response.data.totalHits,
        },
      }));
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setResponse({
        data: { hits: [], totalHits: 0 },
      });
      const response = await getImages(inputValue, 1);
      setResponse({
        data: {
          hits: response.data.hits,
          totalHits: response.data.totalHits,
        },
      });
      setIsSubmitted(true);
      setPage(1);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (isSubmitted) {
      fetchImages();
    }
  }, [isSubmitted, fetchImages]);

  useEffect(() => {
    if (page > 1) {
      fetchImages();
    }
  }, [page, fetchImages]);

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const { hits, totalHits } = response.data;
  const showLoadMoreButton = hits.length < totalHits;

  return (
    <div>
      <SearchBar handleSubmit={handleSubmit} handleChange={handleChange} />
      {isSubmitted && !error && (
        <>
          <ImageGallery hits={hits} isLoading={isLoading} />
          {showLoadMoreButton && <ButtonLoadMore loadMore={loadMore} />}
        </>
      )}
    </div>
  );
};
