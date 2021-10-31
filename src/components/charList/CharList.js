import './charList.scss';
import {Component} from "react";
import {MarvelService} from "../../services/MarvelService";
import {CharItem} from "./charItem/CharItem";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import {Spiner} from "../spiner/Spiner";

class CharList extends Component {
  state = {
    chars: new Array(9).fill(undefined),
    loaded: true,
    error: false,
  }

  marvelService = new MarvelService();

  onError = () => {
    this.setState({loaded: false, error: true});
    clearInterval(this.idInterval);
    this.idInterval = setInterval(() => (this.updateChars), 3000);
  }

  onSelectChange = (id) => {
    this.setState(({chars}) => {
      return chars.map(char => {
        if(char.id === id) {
          return {...char, select: true};
        } else {
          return {...char, select: false};
        }
      })
    })
}

  updateChars = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onLoadedChars)
      .catch(this.onError);
  }

  onLoadedChars = (chars) => {
    this.setState({chars, loaded: false, error: false})
  }

  componentDidMount() {
    this.updateChars();
  }

  render() {
    const {chars, loaded, error} = this.state;

    const charItem = chars.map((char, index) => {
      if(char) {
        return (
          <CharItem name={char.name}
                    thumbnail={char.thumbnail}
                    key={char.id}
                    id={char.id}
                    onChangeId={this.props.onChangeId}
                    onSelectChange={this.onSelectChange}
          />
        )
      } else {
        return (
          <ViewAlt loaded={loaded} error={error} key={index}/>
        )
      }
    });

    return (
      <div className="char__list">
        <ul className="char__grid">
          {charItem}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

const ViewAlt = ({error, loaded}) => {
  const errorMessage = error ? <ErrorChar/> : null;
  const spiner = loaded ? <SpinerChar/> : null;

  return (
    <>
      {errorMessage}
      {spiner}
    </>
  )
};

const ErrorChar = () => {
  return (
    <li className="char__item" style={{backgroundColor: 'white'}}>
      <ErrorMessage style={{height: '100%', objectFit: 'cover', margin: '0 auto'}}/>
    </li>
  )
}

const SpinerChar = () => {
  return (
    <Spiner/>
  )
}

export default CharList;
