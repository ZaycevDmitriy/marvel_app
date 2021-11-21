import './singleCharacterPage.scss';
import {Link} from "react-router-dom";

const SingleCharacterPage = ({data}) => {
  const {thumbnail, name, description} = data;
  const urlImgError = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
  const styleImg = (thumbnail === urlImgError) ? {objectPosition: 'left'} : null;

  return (
    <>
      <div className="single-char">
        <img src={thumbnail} style={styleImg} alt={name} className="single-char__img"/>
        <div className="single-char__info">
          <h2 className="single-char__name">{name}</h2>
          <p className="single-char__descr">{description ? description : 'no description'}</p>
        </div>
        <Link to="/" className="single-char__back">Back to home</Link>
      </div>
    </>
  )
}

export default SingleCharacterPage;
