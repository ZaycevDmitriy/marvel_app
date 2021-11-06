import './charList.scss';
import {Component} from "react";
import {MarvelService} from "../../services/MarvelService";
import {CharItem} from "./charItem/CharItem";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import {Spiner} from "../spiner/Spiner";

class CharList extends Component {
  state = {
    chars: new Array(9).fill(undefined),
    firstBoot: true,  // первая загрузка
    loaded: true, // идет загрузка персонажей, крутится спинер
    error: false,
    offset: 210,
    loadingBtn: false,
    ending: false,
  }

  marvelService = new MarvelService();

  onError = () => {
    this.setState({loaded: false, error: true});
    clearInterval(this.idInterval);
    this.idInterval = setInterval(() => (this.updateChars), 3000);
  }

  // onSelectChange = (id) => {
  //   this.setState(({chars}) => {
  //     return {chars: chars.map(char => {
  //       if(char.id === id) {
  //         return {...char, select: true};
  //       } else {
  //         return {...char, select: false};
  //       }
  //     })}
  //   })
  // }

  updateChars = () => {
    this.onLoadingChars();
  }

  onLoadingChars = (offset) => {
    if (offset > 1556) {
      this.setState({ending: true})
    }
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onLoadedChars)
      .catch(this.onError);
  }

  onChangeLoadingBtn = () => {
    this.setState({loadingBtn: true})
  }

  onLoadedChars = (newChars) => {
    // при первой загрузке переписываем array chars
    if(this.state.firstBoot) {
      this.setState({
        chars: newChars,
        loaded: false,
        error: false,
        firstBoot: false,
      });
    } else {
      this.setState(({chars, offset}) => ({
        chars: [...chars, ...newChars],
        offset: offset + 9,
        loadingBtn: false,
      }));
    }
  }

  componentDidMount() {
    this.updateChars();
  }

  render() {
    const {chars, loaded, error, loadingBtn, ending} = this.state;

    const charItem = chars.map((char, index) => {
      if(char) {
        return (
          <CharItem name={char.name}
                    thumbnail={char.thumbnail}
                    key={char.id}
                    id={char.id}
                    onChangeId={this.props.onChangeId}
                    // onSelectChange={this.onSelectChange}
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
        <button className="button button__main button__long"
        onClick={() => {
          this.onLoadingChars(this.state.offset + 9);
          this.onChangeLoadingBtn();
        }}
        disabled={loadingBtn}
        style={ending ? {display: 'none'} : {display: 'block'}}>
          <div className="inner">{loadingBtn ? 'loading ...' : 'load more'}</div>
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
