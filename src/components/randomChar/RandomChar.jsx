import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {useEffect, useState} from "react";
import useMarvelService from "../../services";
// import Spinner from "../spiner";
import ErrorMessage from "../errorMessage";
import SpinnerMarvel from "../spinnerMarvel";

const RandomChar = () => {
  const [char, setChar] = useState({});

  const {loading, getCharacter, error, clearError} = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  }

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    getCharacter(id)
      .then(onCharLoaded);
  }

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styleError = {
    width: '250px',
    height: '100%',
    objectFit: 'contain',
    margin: '0 auto'
  };

  const errorMessage = error ? <ErrorMessage style={styleError}/> : null;
  const spinner = loading ? <SpinnerMarvel/> : null;
  const content = !(loading || error || !char) ? <View char={char}/> : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!<br/>
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">
          Or choose another one
        </p>
        <button className="button button__main" onClick={() => {
          clearError();
          updateChar();
        }}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
      </div>
    </div>
  )

}

const View = ({char}) => {
  const {name, description, homepage, wiki, thumbnail} = char;
  const urlImgError = thumbnail ? thumbnail.indexOf('image_not_available.jpg') : 0;
  const styleImg = (urlImgError !== -1) ? {objectPosition: 'left'} : null;

  return (
    <div className="randomchar__block">
      <img src={thumbnail} style={styleImg} alt="Random character" className="randomchar__img"/>
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description ? description : 'No description'}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default RandomChar;
