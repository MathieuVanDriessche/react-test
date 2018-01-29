import React from 'react';
import ReactDOM from 'react-dom';

class GenresSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article>
        <header>
          <h1>What kind of music will you broadcast ?</h1>
          <p>(Select from 1 to {this.props.MaximumNbOfSelections} genres maximum)</p>
        </header>
      </article>
    );
  }
}

ReactDOM.render(
  <GenresSelector MaximumNbOfSelections="5" />,
  document.getElementById('root')
);