import './styles.css';

// shorter syntax for components without any logics
export const PostCard = ({ cover, title, body }) => (
  <div className="post">
    <img src={cover} alt={title} />
    <div className='post-content'>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  </div>
);