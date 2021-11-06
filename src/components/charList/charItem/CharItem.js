import './charItem.scss';
import {Component, createRef} from "react";
import PropTypes from "prop-types";

export class CharItem extends Component {
  selectCard = createRef();

  onSelectCard = () => {
    if (this.selectCard) {
      this.selectCard.current.focus();
    }
 }

  render() {
    let {name, thumbnail, id, onChangeId} = this.props;
    const styleImg = (thumbnail.indexOf('image_not_available') !== -1) ? {objectPosition: 'left'} : null;

    return (
      <li className="char__item"
          onClick={() => {
            onChangeId(id);
            // onSelectChange(id);
            this.onSelectCard()
          }}
          ref={this.selectCard}
          tabIndex={0}
          onKeyUp={e => {
            if(e.key === ' ' || e.key === 'Enter') onChangeId(id);
          }}
      >
        <img src={thumbnail} alt={name} style={styleImg}/>
        <div className="char__name">{name}</div>
      </li>
    )
  }
}

CharItem.propTypes = {
  onChangeId: PropTypes.func.isRequired,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
  id: PropTypes.number,
}
