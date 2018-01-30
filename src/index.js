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
    <label for={props.id}><input type="checkbox" id={props.id} name="genres" value={props.id} />{props.label}</label>
  );
}

function ListItem(props) {
  const item = props.item;
  return (
    <li>
      <Checkbox id={props.id} label={item.Name} />
      {Array.isArray(item.Genres) && item.Genres.length > 0 ? <List list={item.Genres} /> : ''}
    </li>
  );
}

function List(props) {
  const list = props.list;
  const listItems = list.map((item) => {
    const id = item.ID || item.Name.replace(/\s/g,'');
    return <ListItem key={id} id={id} item={item}/>
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
        <List list={this.props.genres} />
      </article>
    );
  }
}

ReactDOM.render(
  <GenresSelector genres={musicGenres} maximumNbOfSelections="5" />,
  document.getElementById('root')
);