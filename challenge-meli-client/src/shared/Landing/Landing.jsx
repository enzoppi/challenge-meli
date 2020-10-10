import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './Landing.scss';
import Header from 'shared/Header/Header';
import Nav from 'shared/Nav/Nav'
import ViewsRoutes from 'views/ViewsRoutes';

function Landing(props) {
  return (
    <div className="Landing">
      <BrowserRouter>
        <Header>
          <Nav />
        </Header>
        <ViewsRoutes />
      </BrowserRouter>
    </div>
  );
}

export default Landing;
