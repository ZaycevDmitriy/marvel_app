import './charList.scss';
import {useEffect, useState} from "react";
import useMarvelService from "../../services";
import CharItem from "./charItem";
import ErrorMessage from "../errorMessage";
import SpinnerMarvel from "../spinnerMarvel";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const CharList = (props) => {
  const [chars, setChars] = useState(new Array(9).fill(undefined));
  const [firstBoot, setFirstBoot] = useState(true);
  const [offset, setOffset] = useState(210);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [ending, setEnding] = useState(false);

  const {loading, error, getAllCharacters} = useMarvelService();

  const updateChars = () => {
    setFirstBoot(true);
    onLoadingChars();
  }

  const onLoadingChars = (offset) => {
    if (offset > 1556) {
      setEnding(true);
    }
      getAllCharacters(offset)
      .then(onLoadedChars)
  }

  const onChangeLoadingBtn = () => {
    setLoadingBtn(true);
  }

  const onLoadedChars = (newChars) => {
    // при первой загрузке переписываем array chars
    if(firstBoot) {
      setChars(newChars);
      setFirstBoot(false);
      setLoadingBtn(false);
    } else {
      setChars(chars => [...chars, ...newChars]);
      setOffset(offset => offset + 9);

      setLoadingBtn(false);
    }
  }

  useEffect(() => {
    updateChars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const charItem = chars.map((char, index) => {
    if(char) {
      return (
        <CSSTransition key={char.id} timeout={500} classNames="char__item">
          <CharItem name={char.name}
                    thumbnail={char.thumbnail}
                    id={char.id}
                    onChangeId={props.onChangeId}
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
    <div className="char__list">
        <ul>
          <TransitionGroup className="char__grid">
            {charItem}
          </TransitionGroup>
        </ul>
      <button className="button button__main button__long"
      onClick={() => {
        onLoadingChars(offset + 9);
        onChangeLoadingBtn();
      }}
      disabled={loadingBtn}
      style={ending ? {display: 'none'} : {display: 'block'}}>
        <div className="inner">{loadingBtn ? 'loading ...' : 'load more'}</div>
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
    <li className="char__item" style={{backgroundColor: 'white'}}>
      <ErrorMessage style={{height: '100%', objectFit: 'cover', margin: '0 auto'}}/>
    </li>
  )
}

export default CharList;
