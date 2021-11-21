import './comicsList.scss';
import {useEffect, useState} from "react";
import useMarvelService from "../../services";
import ComicsItem from "./comicsItem";
import ErrorMessage from "../errorMessage";
import SpinnerMarvel from "../spinnerMarvel";
import {CSSTransition, TransitionGroup} from "react-transition-group";

function ComicsList() {
  const [comics, setComics] = useState(Array(8).fill(undefined));
  const [offset, setOffset] = useState(250);
  const [ending, setEnding] = useState(false);
  const [firstBoot, setFirstBoot] = useState(true);

  const {loading, error, getAllComics} = useMarvelService('comics');

  const updateComics = () => {
    setFirstBoot(true);
    onLoadingComics();
  }

  const onLoadingComics = (offset) => {
    if (offset > 50265) {
      setEnding(true);
    }
    getAllComics(offset, 8)
      .then(onLoadedComics)
  }

  const onLoadedComics = (newComics) => {
    // при первой загрузке переписываем array chars
    if(firstBoot) {
      setComics(newComics);
      setFirstBoot(false);
    } else {
      setComics(comics => [...comics, ...newComics]);
      setOffset(offset => offset + 8);
    }
  }

  useEffect(() => {
    updateComics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const comicsItem = comics.map((comic, index) => {
    if(comic) {
      return (
        <CSSTransition key={index} classNames="comics__item" timeout={600}>
          <ComicsItem title={comic.title}
                      thumbnail={comic.thumbnail}
                      price={comic.prices}
                      id={comic.id}
          />
        </CSSTransition>

      )
    } else {
      return (
        <ViewAlt loaded={loading} error={error} key={index}/>
      )
    }
  });

  return (
    <div className="comics__list">
      <ul>
        <TransitionGroup className="comics__grid">
          {comicsItem}
        </TransitionGroup>
      </ul>
      <button className="button button__main button__long"
              onClick={() => {
                onLoadingComics(offset + 8);
              }}
              disabled={loading}
              style={ending ? {display: 'none'} : {display: 'block'}}
      >
        <div className="inner">
          {loading ? 'loading...' : 'load more'}
        </div>
      </button>
    </div>
  )
}

const ViewAlt = ({error, loaded}) => {
  const errorMessage = error ? <ErrorChar/> : null;
  const spinner = loaded ? <SpinnerMarvel/> : null;

  return (
    <>
      {errorMessage}
      {spinner}
    </>
  )
};

const ErrorChar = () => {
  return (
    <li className="comics__list" style={{backgroundColor: 'white'}}>
      <ErrorMessage style={{height: '100%', objectFit: 'cover', margin: '0 auto'}}/>
    </li>
  )
}

export default ComicsList;
