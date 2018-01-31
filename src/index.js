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

function Checkbox(props) {
  return (
    <label><input type="checkbox" id={props.id} name="genres" value={props.id} defaultChecked={props.selected} />{props.label}</label>
  );
}

function ListItem(props) {
  const item = props.item;
  return (
    <li>
      <Checkbox id={props.id} label={item.Name} selected={props.idsOfSelected.includes(props.id)} />
      {Array.isArray(item.Genres) && item.Genres.length > 0 ? <List list={item.Genres} idsOfSelected={props.idsOfSelected} /> : ''}
    </li>
  );
}

function List(props) {
  const list = props.list;
  const listItems = list.map((item) => {
    const id = item.ID || item.Name.replace(/\s/g,'');
    return <ListItem key={id} id={id} item={item} idsOfSelected={props.idsOfSelected} />
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
    this.state = {
      idsOfSelected: props.idsOfSelected || [],
    };
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
        <List list={this.props.genres} idsOfSelected={this.state.idsOfSelected} />
      </article>
    );
  }
}

ReactDOM.render(
  <GenresSelector genres={musicGenres} maximumNbOfSelections="5" />,
  document.getElementById('root')
);