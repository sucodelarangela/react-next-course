import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Home from '.';

// creating handlers to intercept requisitions from front end with mock-service-workers. In this case, the handler will intercept the real data from the url and return this mock data.
const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title 1',
          body: 'body 1',
        },
        {
          userId: 2,
          id: 2,
          title: 'title 2',
          body: 'body 2',
        },
        {
          userId: 3,
          id: 3,
          title: 'title 3',
          body: 'body 3',
        },
      ]),
    );
  }),
  rest.get('https://jsonplaceholder.typicode.com/photos', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          url: 'img1.jpg',
        },
        {
          url: 'img2.jpg',
        },
        {
          url: 'img3.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  // before all tests, listen to the server
  beforeAll(() => {
    server.listen();
  });

  // after all tests, closes the server connection
  afterAll(() => {
    server.close();
  });

  // after each test, reset the handlers
  afterEach(() => {
    server.resetHandlers();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);

    // noMorePosts is briefly rendered in the screen before data fetching finishes...
    const noMorePosts = screen.getByText('Não existem posts.');

    expect.assertions(3);

    // ...using async methods to verify if noMorePosts disappears from the screen after fetching finishes. App must be running for fetch to work.
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();

    screen.debug();
  });

  it('should search for posts', async () => {
    render(<Home />);

    // noMorePosts is briefly rendered in the screen before data fetching finishes...
    const noMorePosts = screen.getByText('Não existem posts.');

    expect.assertions(9);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);

    // user searches for 'title 1'
    userEvent.type(search, 'title 1');

    // getByRole expects to be rendered
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
    // queryByRole returns null if object not rendered instead of error
    expect(screen.queryByRole('heading', { name: 'title 2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 3' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Search value: title 1' })).toBeInTheDocument();

    // user clears the search input
    userEvent.clear(search);

    // now all headings must show
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 3' })).toBeInTheDocument();

    userEvent.type(search, 'bla bla');

    expect(screen.getByText('Não existem posts.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /bla bla/i })).toBeInTheDocument();
  });

  it('should load more posts', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não existem posts.');

    // expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more posts/i });

    userEvent.click(button);

    expect(screen.getByRole('heading', { name: 'title 3' })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});

// Usually we use 'spec' on test files for unit tests and 'test' for integration tests
