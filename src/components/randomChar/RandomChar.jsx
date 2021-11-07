import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {useEffect, useState} from "react";
import {MarvelService} from "../../services/MarvelService";
import Spinner from "../spiner";
import ErrorMessage from "../errorMessage";

const RandomChar = () => {
  const [char, setChar] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
    setError(false);
  }

  const onCharLoading = () => {
    setLoading(() => true);
    setError(() => false);
  }

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    onCharLoading();
    marvelService
      .getCharacter(id)
      .then(onCharLoaded)
      .catch(onError);
  }

  const onError = () => {
    setLoading(() => false);
    setError(() => true);
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
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error) ? <View char={char}/> : null;

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
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
      </div>
    </div>
  )

}

const View = ({char}) => {
  const {name, description, homepage, wiki, thumbnail} = char;
  const styleImg = (thumbnail.indexOf('image_not_available') !== -1) ? {objectPosition: 'left'} : null;

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
