import './singleComicPage.scss';
import {Link} from "react-router-dom";

const SingleComicPage = ({data}) => {
  const {title, prices, thumbnail, pageCount, description, language} = data;
  const urlImgError = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
  const styleImg = (thumbnail === urlImgError) ? {objectPosition: 'left'} : null;

  return (
    <>
      <div className="single-comic">
        <img src={thumbnail} style={styleImg} alt={title} className="single-comic__img"/>
        <div className="single-comic__info">
          <h2 className="single-comic__name">{title}</h2>
          <p className="single-comic__descr">{description}</p>
          <p className="single-comic__descr">{pageCount}</p>
          <p className="single-comic__descr">{`Language: ${language}`}</p>
          <div className="single-comic__price">{prices}</div>
        </div>
        <Link to="/comics" className="single-comic__back">Back to all</Link>
      </div>
    </>
  )
}

export default SingleComicPage;
