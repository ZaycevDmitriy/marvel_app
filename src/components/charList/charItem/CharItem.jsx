import './charItem.scss';
import {useRef} from "react";
import PropTypes from "prop-types";
import {scroller} from "react-scroll";

const CharItem = ({name, thumbnail, id, onChangeId}) => {
  const selectCard = useRef();

  const onSelectCard = () => {
    selectCard?.current.focus();
 }

 const onScrollerCharItem = () => {
    scroller.scrollTo('scrollToCharInfo', {
      duration: 1000,
      delay: 100,
      smooth: 'easeInOutQuad',
      offset: -10,
    })
 }

  const urlImgError = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
  const styleImg = (thumbnail === urlImgError) ? {objectPosition: 'left'} : null;

  return (
    <li className="char__item"
        onClick={() => {
          onChangeId(id);
          onSelectCard();
          onScrollerCharItem();
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
