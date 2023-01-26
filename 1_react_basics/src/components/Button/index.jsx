import P from 'prop-types';
import './styles.css';

export const Button = ({ text, clickAction, disabled = false }) => (
  <button onClick={clickAction} className="button" disabled={disabled}>
    {text}
  </button>
);

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  clickAction: P.func.isRequired,
  disabled: P.bool,
};
