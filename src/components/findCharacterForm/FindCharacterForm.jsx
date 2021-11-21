import './findCharacterForm.scss';
import { Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import {useState} from "react";
import MarvelService from "../../services/MarvelService";
import {Link} from "react-router-dom";

const FindCharacterForm = () => {
  const [char, setChar] = useState(null);
  const {loading, clearError, getCharacterFindForName} = MarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  }

  const findChar = (name) => {
    clearError();
    if ( char && char.name === name) return;
    getCharacterFindForName(name)
      .then(onCharLoaded)
  }

  const result = !char ? null : !(char === 'notFound') ? <ResultCharTrue char={char}/> : <ResultCharFalse/>

  return (
    <Formik initialValues={{
      name: ''
    }} validationSchema={yup.object({
      name: yup.string()
        .required('This field is required'),
    })} onSubmit={({name}) => findChar(name)}>
      <Form className="form">
        <label className="form__label" htmlFor="findForm">Or find a character by name:</label>
        <div className="form__input-wrapper">
          <Field className="form__input" id="findForm" type="text" name="name" placeholder="Enter name"/>
          <button className="button button__main" type="submit" disabled={loading}>
            <div className="inner">Find</div>
          </button>
        </div>
        <ErrorMessage className="form__error" name="name" component={'div'}/>
          {result}
      </Form>
    </Formik>
  )
}

const ResultCharTrue = ({char}) => {
  return (
    <div className="form__results" style={{color: '#03710E'}}>
      {`There is! Visit ${char.name} page?`}
      <Link to={`/character/${char.id}`} className="button button__secondary">
        <div className="inner">TO PAGE</div>
      </Link>
    </div>
  )
}

const ResultCharFalse = () => {
  return (
    <div className="form__results" style={{color: '#9F0013'}}>
      The character was not found. Check the name and try again
    </div>
  )
}

export default FindCharacterForm;
