import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchResults from 'views/SearchResults/SearchResults';

function SectionsRoutes() {
  return (
    <>
      <Switch>
        <Route path="/items">
          <SearchResults />
        </Route>
      </Switch>
    </>
  );
}

export default SectionsRoutes;
