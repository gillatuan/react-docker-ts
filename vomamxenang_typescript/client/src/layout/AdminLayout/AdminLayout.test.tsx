import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import AdminLayout from 'layout/AdminLayout/AdminLayout';

describe('<AdminLayout />', () => {
  const wrapper = renderer.create(
    <BrowserRouter>
      <AdminLayout>
        <div>Hi, this is some form for Admin page.</div>
      </AdminLayout>
    </BrowserRouter>
  );

  test('render snapshot correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
