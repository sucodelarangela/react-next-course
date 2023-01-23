import './styles.css';

export const Button = ({ text, clickAction, disabled }) => (
  <button
    onClick={clickAction}
    className='button'
    disabled={disabled}
  >
    {text}
  </button>
);
// class component just for learning purposes
// export class Button extends Component {
//   render() {
//     const { text, clickAction, disabled } = this.props;

//     return (
//       <button onClick={clickAction} className='button' disabled={disabled}>{text}</button>
//     );
//   }
// }