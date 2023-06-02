import React from 'react';
import { ImageGalleryItem } from '../ItemImageGallery/ImageGalleryItem';
import { DotLoader } from 'react-spinners';
import s from './ImageGallery.module.css';
import { nanoid } from 'nanoid';

export const ImageGallery = ({ hits, isLoading, loadMore }) => {
  if (isLoading) {
    return (
      <div className={s.Loader}>
        <DotLoader color="#36d7b7" size={100} loading={true} />
      </div>
    );
  }

  return (
    <ul className={s.ImageGallery}>
      {hits.map(el => (
        <ImageGalleryItem
          imgURL={el.webformatURL}
          key={nanoid()}
          largeImgURL={el.largeImageURL}
        />
      ))}
    </ul>
  );
};
