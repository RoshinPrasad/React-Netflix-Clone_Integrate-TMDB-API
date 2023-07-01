import React, { useEffect, useState } from 'react';
import { baseUrl, imgUrl, apiKey } from '../../Constants/constants';
import '../../App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "react-responsive-modal/styles.css";
import ReactPlayer from "react-player";
import Modal from "react-responsive-modal";

import Slider from "react-slick";
import fallbackImage from './cropping_dbox.jpg'; // Replace 'path_to_fallback_image' with the URL or path to your fallback image

function MovieRow({ id, category, title }) {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  let reqUrl = `${baseUrl}movie/${category}?api_key=${apiKey}&with_genres=878`;

  useEffect(() => {
    fetch(reqUrl)
      .then(moviesRes => moviesRes.json())
      .then(movies => {
        setMovies(movies.results.reverse());
      });
  }, []);

  const handleClick = async (id) => {
    const reqUrl = `${baseUrl}movie/${id}/videos?api_key=${apiKey}&language=en-US`;
    const videoUrlRes = await fetch(reqUrl);
    const videoUrlArr = await videoUrlRes.json();
    setVideoUrl(videoUrlArr.results[0].key);
    toggleModal();
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  var settings = {
    infinite: false,
    speed: 500,
    dots: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <div className='slider-container'>
        <h1 className='category_title'>{title}</h1>
        <Slider {...settings}>
          {movies.length > 0 &&
            movies.map((movie) => (
              <div
                className='poster_container'
                key={movie.id}
                onClick={() => {
                  handleClick(movie.id);
                }}
              >
                {movie.backdrop_path ? (
                  <img
                    src={`${imgUrl + movie.backdrop_path}`}
                    alt={movie.title}
                    className='poster'
                  />
                ) : (
                  <img
                    src={fallbackImage}
                    alt='Fallback Movie Poster'
                    className='poster'
                  />
                )}
              </div>
            ))}
        </Slider>
      </div>
      <Modal
        open={open}
        onClose={toggleModal}
        styles={{
          modal: {
            maxWidth: 'unset',
            width: '80%',
            padding: 'unset',
          },
          overlay: {
            background: 'rgba(0, 0, 0, 0.5)',
          },
          closeButton: {
            background: 'white',
          },
        }}
        center
      >
        <ReactPlayer
          url={`https://youtu.be/${videoUrl}`}
          width="100%"
          height="calc(90vh - 80px)"
        />
      </Modal>
    </React.Fragment>
  );
}

export default MovieRow;
