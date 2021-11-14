import './singleComicPage.scss';
import {useEffect, useState} from "react";
// import PropTypes from 'prop-types';
import {Link, useParams} from "react-router-dom";
import useMarvelService from "../../../services";
import SpinnerMarvel from "../../spinnerMarvel";
import ErrorMessage from "../../errorMessage";

const SingleComicPage = () => {
  const {comicId} = useParams();
  const [comic, setComic] = useState(null);
  const {loading, error, getComic, clearError} = useMarvelService();

  const onCharLoaded = (comic) => {
    setComic(comic);
  }

  const updateComic = (id) => {
    clearError();
    getComic(id)
      .then(onCharLoaded)
  }

  useEffect(() => {
    if(comicId) updateComic(comicId);
    // eslint-disable-next-line
  }, [comicId]);

  const styleError = {
    width: '250px',
    height: '100%',
    objectFit: 'contain',
    margin: '0 auto'
  };

  const errorMessage = error ? <ErrorMessage style={styleError}/> : null;
  const spinner = loading ? <SpinnerMarvel/> : null;
  const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
      <>
        {errorMessage}
        {spinner}
        {content}
      </>
    )
}

const View = ({comic}) => {
  const {title, prices, thumbnail, pageCount, description, language} = comic;
  const urlImgError = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
  const styleImg = (thumbnail === urlImgError) ? {objectPosition: 'left'} : null;

  return (
    <div className="single-comic">
      <img src={thumbnail} style={styleImg} alt="title" className="single-comic__img"/>
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">{`Language: ${language}`}</p>
        <div className="single-comic__price">{prices}</div>
      </div>
      <Link to="/comics" className="single-comic__back">Back to all</Link>
    </div>
  )
}

export default SingleComicPage;
