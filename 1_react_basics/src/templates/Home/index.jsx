import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';

class Home extends Component {
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
    const postsAndPhotos = await loadPosts();
    this.setState({ posts: postsAndPhotos });
  };

  render() {
    const { posts } = this.state;

    return (
      <section className='container'>
        <Posts posts={posts} />
      </section>
    );
  }
}

export default Home;
