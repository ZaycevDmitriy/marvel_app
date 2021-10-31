import './charItem.scss';
import {Component} from "react";

export class CharItem extends Component {
  render() {
    let {name, thumbnail, id, onChangeId, onSelectChange,} = this.props;
    const styleImg = (thumbnail.indexOf('image_not_available') !== -1) ? {objectPosition: 'left'} : null;

    return (
      <li className="char__item" onClick={() => {
        onChangeId(id);
        onSelectChange(id);
      }}>
        <img src={thumbnail} alt={name} style={styleImg}/>
        <div className="char__name">{name}</div>
      </li>
    )
  }
}
