import React from 'react';
import {act, render, screen} from '@testing-library/react';
import ReactDOM from 'react-dom';
import {SocialNetworkApp} from "./App";

test('renders learn react link', () => {
  // render(<SocialNetworkApp />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();

  act(() => {
    /* fire events that update state */
    const div = document.createElement('div');
    ReactDOM.render(<SocialNetworkApp/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
