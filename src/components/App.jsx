import React, { useState, useEffect, useCallback } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'components/ImagesAPI/imagesApi';
import { ButtonLoadMore } from './ButtonLoadMore/ButtonLoadMore';

export const App = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [response, setResponse] = useState({
    data: { hits: [], totalHits: 0 },
  });
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const fetchImages = useCallback(async () => {
    try {
      const response = await getImages(searchQuery, page);
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
  }, [searchQuery, page]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setPage(1);
      setIsLoading(true);
      setResponse({
        data: { hits: [], totalHits: 0 },
      });
      setSearchQuery(inputValue);
      setIsSubmitted(true);
      setIsFetched(true);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (isSubmitted) {
      setPage(prevPage => prevPage + 1);
      setIsFetched(true);
    }
  };

  useEffect(() => {
    if (isSubmitted && isFetched) {
      fetchImages();
      setIsFetched(false);
    }
  }, [isSubmitted, isFetched, fetchImages, page]);

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
