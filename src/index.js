import React from 'react';
import ReactDOM from 'react-dom';
import musicGenres from '../src/mocks/music_genres'
import '../src/index.css'

function Feedback(props) {
  if (props.nbOfSelections === 0) {
    return <p><strong>You must select at least one genre!</strong></p>;
  }
  if (props.nbOfSelections > props.maximumNbOfSelections) {
    return <p><strong>You can only select up to {props.maximumNbOfSelections} genres!</strong></p>;
  }
  return <p>{props.nbOfSelections} genre{props.nbOfSelections > 1 ? 's':''} selected</p>;
}

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onClick(e.target.id);
  }

  render() {
    const {name, id, idsOfSelected, parentIsOpen} = this.props;
    const checked = idsOfSelected.includes(id);
    const isHidden = !checked && !parentIsOpen;
    return (
      <p className={isHidden ? 'is-hidden' : ''}>
        <input
          type="checkbox"
          id={id}
          name="genres"
          value={id}
          disabled={isHidden}
          defaultChecked={checked}
          onClick={this.handleClick}
        />
        <label htmlFor={id}>
          {name}
        </label>
      </p>
    );
  }
}

class Fieldset extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  handleClick() {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    return (
      <fieldset>
        <legend>
          <button onClick={this.handleClick}>
            {this.props.legend}
          </button>
        </legend>
        {this.props.fields.map((field) =>
          <Checkbox
            key={field.ID}
            id={field.ID}
            name={field.Name}
            idsOfSelected={this.props.idsOfSelected}
            parentIsOpen={this.state.isOpen}
            onClick={this.props.onClick}
          />
        )}
      </fieldset>
    );
  };
}

class GenresSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      idsOfSelected: props.idsOfSelected || [],
    };
  }

  handleClick(id) {
    const idsOfSelected = this.state.idsOfSelected.slice();
    const idValid = (+id) || id; // Convert String id to Number if possible. +"123" => 123
    const index = idsOfSelected.indexOf(idValid);
    if (-1 !== index) {
      idsOfSelected.splice(index, 1);
    } else (
      idsOfSelected.push(idValid)
    );
    this.setState({idsOfSelected: idsOfSelected});
  }

  render() {
    return (
      <article>
        <header>
          <h1>What kind of music will you broadcast ?</h1>
          <p>(Select from 1 to {this.props.maximumNbOfSelections} genres maximum)</p>
          <Feedback
            nbOfSelections={this.state.idsOfSelected.length}
            maximumNbOfSelections={this.props.maximumNbOfSelections}
          />
        </header>
        {this.props.genres.map((fieldset) =>
          <Fieldset
            key={fieldset.Name.replace(/\s/g,'')}
            legend={fieldset.Name}
            fields={fieldset.Genres}
            idsOfSelected={this.state.idsOfSelected}
            onClick={this.handleClick}
          />
        )}
      </article>
    );
  }
}

ReactDOM.render(
  <GenresSelector genres={musicGenres} maximumNbOfSelections="5" />,
  document.getElementById('root')
);