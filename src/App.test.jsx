import React from 'react';
import TestRenderer from 'react-test-renderer';
import { store } from './redux/store';
import { Provider } from 'react-redux';

import App from './App';
import { describe, expect, it } from 'vitest';

const render = (component) =>
  TestRenderer.create(<Provider store={store}>{component}</Provider>);

describe('App', () => {
  it('Should be defined', () => {
    const screen = render(<App />).toJSON();

    expect(screen).toBeDefined();
    expect(screen.children[0].type).toBe('div');
  });
});
