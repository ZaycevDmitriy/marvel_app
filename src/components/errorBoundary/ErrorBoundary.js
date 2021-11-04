import {Component} from "react";


export class ErrorBoundary extends Component {
  state = {
    error: false,
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({error: true})
  }

  render() {
    const {error} = this.state;

    return error ? <h2>Something went wrong</h2> : this.props.children;
  }
}
