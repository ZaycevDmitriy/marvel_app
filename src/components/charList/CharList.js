import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';
import {Component} from "react";
import {MarvelService} from "../../services/MarvelService";
import {CharItem} from "./charItem/CharItem";

class CharList extends Component {
  state = {
    chars: [],
  }

  marvelService = new MarvelService();

  updateChars = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onLoadedChars)
  }

  onLoadedChars = (chars) => {
    this.setState({chars})
  }

  componentDidMount() {
    this.updateChars();
  }

  render() {
    const {chars} = this.state;
    const charItem = chars.map(char => <CharItem name={char.name} thumbnail={char.thumbnail} key={char.id}/>);

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

export default CharList;
