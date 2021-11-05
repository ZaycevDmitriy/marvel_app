import './charInfo.scss';
import {Component} from "react";
import PropTypes from 'prop-types';
import {MarvelService} from "../../services/MarvelService";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import {Spiner} from "../spiner/Spiner";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  }

  marvelService = new MarvelService();

  onCharLoaded = (char) => {
    this.setState({char, loading: false, error: false});
  }

  onCharLoading = () => {
    this.setState({loading: true, error: false});
  }

  updateChar = (id) => {
    this.onCharLoading();
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) this.updateChar(this.props.charId);
  }

  render() {
    const {char, error, loading} = this.state;
    const styleError = {
      width: '250px',
      height: '100%',
      objectFit: 'contain',
      margin: '0 auto'
    };

    const skeleton = (error || loading || char) ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage style={styleError}/> : null;
    const spiner = loading ? <Spiner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spiner}
        {content}
      </div>
    )
  }
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
