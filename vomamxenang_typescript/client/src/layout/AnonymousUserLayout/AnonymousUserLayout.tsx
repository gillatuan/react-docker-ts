import React from 'react';
import 'layout/AnonymousUserLayout/AnonymousUserLayout.scss';

const AnonymousUserLayout: React.FC = ({ children }) => {
  return (
    <div className="fullscreen anonymous-layout">
      <div className="fullscreen__section fullscreen__section--center">
        <div className="fullscreen__section__child anonymous-layout-content">{children}</div>
      </div>
    </div>
  );
};

export default AnonymousUserLayout;
