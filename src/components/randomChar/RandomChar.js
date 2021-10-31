import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {Component} from "react";
import {MarvelService} from "../../services/MarvelService";
import {Spiner} from "../spiner/Spiner";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";

class RandomChar extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.updateChar(); // вызов методов в конструкторе, которые получают с сервера данные плохая практика.
  // }

  state = {
    char: {},
    loading: true,
    error: false,
  }

  marvelService = new MarvelService();

  onCharLoaded = (char) => {
    this.setState({char, loading: false, error: false});
  }

  onCharLoading = () => {
    this.setState({loading: true, error: false});
  }

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

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

  componentDidMount() {
    this.updateChar();
  }

  render() {
    const {char, loading, error} = this.state;
    const styleError = {
      width: '250px',
      height: '100%',
      objectFit: 'contain',
      margin: '0 auto'
    };

    const errorMessage = error ? <ErrorMessage style={styleError}/> : null;

    const spiner = loading ? <Spiner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;

    return (
      <div className="randomchar">
        {errorMessage}
        {spiner}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!<br/>
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">
            Or choose another one
          </p>
          <button className="button button__main" onClick={this.updateChar}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
        </div>
      </div>
    )
  }
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
