import classes from './Cardforprofile.module.css';

function Card(props) {
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;