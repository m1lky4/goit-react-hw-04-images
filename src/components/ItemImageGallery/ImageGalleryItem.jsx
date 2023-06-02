import { Component } from "react";
import s from '../ImageGallery/ImageGallery.module.css';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleModalOpen = () => {
    this.setState({ isModalOpen: true });
  };

  handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      this.setState({ isModalOpen: false });
    }
  };

  handleKeyDown = (e) => {
    if (e.key === "Escape") {
      this.setState({ isModalOpen: false });
    }
  };

  render() {
    const { imgURL } = this.props;
    const { isModalOpen } = this.state;

    return (
      <li className={s.ImageGalleryItem}>
        <img
          onClick={this.handleModalOpen}
          className={s.ImageGalleryItemImage}
          src={imgURL}
          alt=""
        />
        {isModalOpen && (
          <div className={s.Overlay} onClick={this.handleOverlayClick}>
            <div className={s.Modal}>
              <img src={this.props.largeImgURL} alt="" />
            </div>
          </div>
        )}
      </li>
    );
  }
}
