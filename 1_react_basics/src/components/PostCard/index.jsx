import P from 'prop-types';
import './styles.css';

// shorter syntax for components without any logics
export const PostCard = ({ cover, title, body }) => (
  <div className="post">
    <img src={cover} alt={title} />
    <div className="post-content">
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  </div>
);

PostCard.propTypes = {
  title: P.string.isRequired,
  cover: P.string.isRequired,
  body: P.string.isRequired,
  id: P.number.isRequired,
};
