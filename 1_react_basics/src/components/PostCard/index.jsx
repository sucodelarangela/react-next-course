// shorter syntax for components without any logics
export const PostCard = ({ id, cover, title, body }) => (
  <div className="post" key={id}>
    <img src={cover} alt={title} />
    <div className='post-content'>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  </div>
);