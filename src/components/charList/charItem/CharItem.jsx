import './charItem.scss';
import {useRef} from "react";
import PropTypes from "prop-types";

const CharItem = ({name, thumbnail, id, onChangeId}) => {
  const selectCard = useRef();

  const onSelectCard = () => {
    selectCard?.current.focus();
 }

  const styleImg = (thumbnail.indexOf('image_not_available') !== -1) ? {objectPosition: 'left'} : null;

  return (
    <li className="char__item"
        onClick={() => {
          onChangeId(id);
          onSelectCard()
        }}
        ref={selectCard}
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

CharItem.propTypes = {
  onChangeId: PropTypes.func.isRequired,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
  id: PropTypes.number,
}

export default CharItem;
