import img from './error.gif';

export const ErrorMessage = ({style}) => {
  const styleError = {
    display: 'block',
    ...style
  };

  return (
    // <img src={process.env.PUBLIC_URL + '/error.gif'}/>
    <img src={img} alt='Error' style={styleError}/>
  )
}
