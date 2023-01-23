import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { SearchInput } from '../../components/SearchInput';

class Home extends Component {
  // state as arrays and objects
  state = {
    posts: [], // get only part of the posts for pagination
    allPosts: [], // get all posts
    page: 0,
    postsPerPage: 9,
    searchValue: ''
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

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      :
      posts;

    return (
      <section className='container'>
        <div className="search-container">
          {/* '!!' converts to boolean */}
          {!!searchValue && (
            <h2>Search value: {searchValue}</h2>
          )}

          <SearchInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts.</p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button
              text='Load more posts'
              clickAction={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
