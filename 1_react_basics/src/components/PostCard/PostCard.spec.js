import { render, screen } from '@testing-library/react';

import { PostCard } from '.';
import { postCardPropsMock } from './mock';

// mocking the props
const props = postCardPropsMock;

describe('<PostCard/>', () => {
  it('should render PostCard correctly', () => {
    // using mock as props and debugging to see the component (snapshot) on the console
    // const { debug } = render(<PostCard {...props} />);
    // debug();
    render(<PostCard {...props} />);

    expect(screen.getByRole('img', { name: /TITLE1/i })).toHaveAttribute('src', 'img/img.png');

    expect(screen.getByRole('heading', { name: /TITLE1/i })).toBeInTheDocument();

    expect(screen.getByText('body1')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<PostCard {...props} />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toMatchSnapshot();
  });
});
