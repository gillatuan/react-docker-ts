import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import AnonymousUserLayout from 'layout/AnonymousUserLayout/AnonymousUserLayout';

describe('<AnonymousUserLayout />', () => {
  const wrapper = renderer.create(
    <BrowserRouter>
      <AnonymousUserLayout>
        <div>Hi, this is some form for anonymous user like login, register, etc.</div>
      </AnonymousUserLayout>
    </BrowserRouter>
  );

  test('render snapshot correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
