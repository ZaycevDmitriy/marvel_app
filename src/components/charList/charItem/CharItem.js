import './charItem.scss';

export const CharItem = ({name, thumbnail}) => {
  const styleImg = (thumbnail.indexOf('image_not_available') !== -1) ? {objectPosition: 'left'} : null;

  return (
    <li className="char__item">
      <img src={thumbnail} alt={name} style={styleImg}/>
      <div className="char__name">{name}</div>
    </li>
  )
}
