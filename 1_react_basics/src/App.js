import { Component } from 'react';

import './App.css';

class App extends Component {
  // state as arrays and objects
  state = {
    counter: 0,
    posts: [
      {
        id: 1,
        title: 'O Título 1',
        body: 'O Corpo 1'
      },
      {
        id: 2,
        title: 'O Título 2',
        body: 'O Corpo 2'
      },
      {
        id: 3,
        title: 'O Título 3',
        body: 'O Corpo 3'
      },
    ]
  };

  timeoutUpdate = null;

  // lifecycle methods:
  // DidMount does something ONCE after the component is rendered. Good for fetching API's
  componentDidMount() {
    this.handleTimeout();
  }

  // DidUpdate does something after the component is updated. This example will create an infinite loop with the counter, because every time counter changes, it will be incremented and DidUpdate will be called again
  componentDidUpdate() {
    this.handleTimeout();
  }

  // depending on the function we have on the update, the component may try to continue to update even it it's unmounted, creating errors... to clean up the code, we can use WillUnmount to clear our Timeout (which is happening in our example)
  componentWillUnmount() {
    clearTimeout(this.timeoutUpdate);
  }

  handleTimeout = () => {
    const { posts, counter } = this.state;
    posts[0].title = 'O título mudou!';

    // setTimeout only to simulate a fetching time
    this.timeoutUpdate = setTimeout(() => {
      this.setState({ posts, counter: counter + 1 });
    }, 2000);
  };

  render() {
    const { posts, counter } = this.state;

    return (
      <div className="App">
        <h2>{counter}</h2>
        {posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
