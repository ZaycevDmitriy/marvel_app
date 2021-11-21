import {useEffect, useState} from "react";
// import PropTypes from 'prop-types';
import {useParams} from "react-router-dom";
import useMarvelService from "../../services";
import SpinnerMarvel from "../spinnerMarvel";
import ErrorMessage from "../errorMessage";
import AppBanner from "../appBanner";

const SinglePage = ({Component, dataPach}) => {
  const {id} = useParams();
  const [data, setData] = useState(null);
  const {loading, error, getComic, clearError, getCharacter} = useMarvelService();

  const onDataLoaded = (data) => {
    setData(data);
  }

  const updateData = () => {
    clearError();
    // eslint-disable-next-line default-case
    switch (dataPach) {
      case 'comic':
        getComic(id)
          .then(onDataLoaded);
        break;
      case 'character':
        getCharacter(id)
          .then(onDataLoaded);
        break;
    }

  }

  useEffect(() => {
    if(id) updateData();
    // eslint-disable-next-line
  }, [id]);

  const styleError = {
    width: '250px',
    height: '100%',
    objectFit: 'contain',
    margin: '0 auto'
  };

  const errorMessage = error ? <ErrorMessage style={styleError}/> : null;
  const spinner = loading ? <SpinnerMarvel/> : null;
  const content = !(loading || error || !data) ? <Component data={data}/> : null;

  return (
    <>
      <AppBanner/>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

export default SinglePage;
