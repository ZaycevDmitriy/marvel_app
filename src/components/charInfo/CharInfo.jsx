import './charInfo.scss';
import {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {MarvelService} from "../../services/MarvelService";
import ErrorMessage from "../errorMessage";
import Spinner from "../spiner";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = ({charId}) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
    setError(false);
  }

  const onCharLoading = () => {
    setLoading(true);
    setError(false);
  }

  const onError = () => {
    setLoading(false);
    setError(true);
  }

  const updateChar = (id) => {
    onCharLoading();
    marvelService
      .getCharacter(id)
      .then(onCharLoaded)
      .catch(onError);
  }

  useEffect(() => {
    if(charId) updateChar(charId);
    // eslint-disable-next-line
  }, [charId]);

  const styleError = {
    width: '250px',
    height: '100%',
    objectFit: 'contain',
    margin: '0 auto'
  };

  const skeleton = (error || loading || char) ? null : <Skeleton/>;
  const errorMessage = error ? <ErrorMessage style={styleError}/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !char) ? <View char={char}/> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  )

}

const View = ({char}) => {
  const {name, description, homepage, wiki, thumbnail, comics} = char;
  const styleImg = (thumbnail.indexOf('image_not_available') !== -1) ? {objectPosition: 'left'} : null;

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={styleImg}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description ? description : 'No description'}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'This character has no comics'}
        {comics.map((item, i) => {
          if (i > 10) return null;
          return (
            <li className="char__comics-item" key={i}>
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  )
}

CharInfo.propTypes = {
  charId: PropTypes.number
}

export default CharInfo;
