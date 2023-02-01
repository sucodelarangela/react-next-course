import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
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

    // ...using async methods to verify if noMorePosts disappears from the screen after fetching finishes. App must be running for fetch to work.
    await waitForElementToBeRemoved(noMorePosts);

    screen.debug();
  });
});

// Usually we use 'spec' on test files for unit tests and 'test' for integration tests
