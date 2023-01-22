import { Component } from 'react';

import './App.css';

class App extends Component {
  // state as arrays and objects
  state = {
    posts: []
  };

  // lifecycle methods:
  // DidMount does something ONCE after the component is rendered. Good for fetching API's
  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    // usaremos Promise.all para resolver com await os fetches acima
    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json(); // 100 posts
    const photosJson = await photos.json(); // 5000 imgs

    // 'zipping' to unite only 100 imgs to the 100 posts
    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url };
    });

    this.setState({ posts: postsAndPhotos });
  };

  render() {
    const { posts } = this.state;

    return (
      <section className='container'>
        <div className="posts">
          {posts.map(post => (
            <div className="post" key={post.id}>
              <img src={post.cover} alt={post.title} />
              <div className='post-content'>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default App;
