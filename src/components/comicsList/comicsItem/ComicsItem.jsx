import './comicsItem.scss';
import {Link} from "react-router-dom";

const ComicsItem = ({title, thumbnail, price, id}) => {
  const urlImgError = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
  const styleImg = (thumbnail === urlImgError) ? {objectPosition: 'left'} : null;

  return (
    <li className="comics__item">
      <Link to={`${id}`}>
        <img src={thumbnail} style={styleImg} alt="ultimate war" className="comics__item-img"/>
        <div className="comics__item-name">{title}</div>
        <div className="comics__item-price">
          {price}
        </div>
      </Link>
    </li>
  )
}

export default ComicsItem;
