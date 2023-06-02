import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ItemImageGallery/ImageGalleryItem';
import { DotLoader } from 'react-spinners';
import s from './ImageGallery.module.css';

export class ImageGallery extends Component {
  render() {
    const { isSubmitted, response, isLoading } = this.props;

    if (!isSubmitted) {
      return null;
    }

    if (isLoading) {
      return (
        <div className={s.Loader}>
          <DotLoader color="#36d7b7" size={100} loading={true} />
        </div>
      );
    }

    if (response.data && response.data.hits && response.data.hits.length > 0) {
      return (
        <ul className={s.ImageGallery}>
          {response.data.hits.map((el) => (
            <ImageGalleryItem imgURL={el.webformatURL} key={el.id} largeImgURL={el.largeImageURL} />
          ))}
        </ul>
      );
    }
  }
}

