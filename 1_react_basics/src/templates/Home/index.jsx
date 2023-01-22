import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';

class Home extends Component {
  // state as arrays and objects
  state = {
    posts: [], // get only part of the posts for pagination
    allPosts: [], // get all posts
    page: 0,
    postsPerPage: 9
  };

  // lifecycle methods:
  // DidMount does something ONCE after the component is rendered. Good for fetching API's
  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();

    // setting pagination
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  };

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    // find next page for pagination
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    // add nextPosts to posts state
    posts.push(...nextPosts);

    // set posts state and new value to page
    this.setState({ posts, page: nextPage });
  };

  render() {
    const { posts } = this.state;

    return (
      <section className='container'>
        <Posts posts={posts} />
        <Button
          text='Load more posts'
          clickAction={this.loadMorePosts}
        />
      </section>
    );
  }
}

export default Home;
