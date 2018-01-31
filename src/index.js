import React from 'react';
import ReactDOM from 'react-dom';

function Feedback(props) {
  if (props.nbOfSelections === 0) {
    return <p><strong>You must select at least one genre!</strong></p>;
  }
  if (props.nbOfSelections > props.maximumNbOfSelections) {
    return <p><strong>You can only select up to {props.maximumNbOfSelections} genres!</strong></p>;
  }
  return <p>{props.nbOfSelections} genre{props.nbOfSelections > 1 ? 's':''} selected</p>;
}

class GenresSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nbOfSelections: 0,
    };
  }

  render() {
    return (
      <article>
        <header>
          <h1>What kind of music will you broadcast ?</h1>
          <p>(Select from 1 to {this.props.maximumNbOfSelections} genres maximum)</p>
          <Feedback nbOfSelections={this.state.nbOfSelections} maximumNbOfSelections={this.props.maximumNbOfSelections} />
        </header>
      </article>
    );
  }
}

ReactDOM.render(
  <GenresSelector maximumNbOfSelections="5" />,
  document.getElementById('root')
);