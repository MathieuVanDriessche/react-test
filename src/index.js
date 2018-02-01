import React from 'react';
import ReactDOM from 'react-dom';
import musicGenres from '../src/mocks/music_genres'

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
    return (
      <label>
        <input
          type="checkbox"
          id={this.props.id}
          name="genres"
          value={this.props.id}
          defaultChecked={this.props.selected}
          onClick={this.handleClick}
        />
        {this.props.label}
      </label>
    );
  }
}

function ListItem(props) {
  const item = props.item;
  return (
    <li>
      <Checkbox id={props.id} label={item.Name} selected={props.idsOfSelected.includes(props.id)} onClick={props.onClick} />
      {Array.isArray(item.Genres) && item.Genres.length > 0 ? <List list={item.Genres} idsOfSelected={props.idsOfSelected} onClick={props.onClick} /> : ''}
    </li>
  );
}

function List(props) {
  const list = props.list;
  const listItems = list.map((item) => {
    const id = item.ID || item.Name.replace(/\s/g,'');
    return <ListItem
      key={id}
      id={id}
      item={item}
      idsOfSelected={props.idsOfSelected}
      onClick={props.onClick}
    />
  });
  return (
    <ul>
      {listItems}
    </ul>
  );
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
        <List
          list={this.props.genres}
          idsOfSelected={this.state.idsOfSelected}
          onClick={this.handleClick}
        />
      </article>
    );
  }
}

ReactDOM.render(
  <GenresSelector genres={musicGenres} maximumNbOfSelections="5" />,
  document.getElementById('root')
);