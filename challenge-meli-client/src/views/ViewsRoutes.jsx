import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchResults from 'views/SearchResults/SearchResults';

function SectionsRoutes() {
  return (
    <div>
      <Switch>
        <Route path="/items">
          <SearchResults />
        </Route>
      </Switch>
    </div>
  );
}

export default SectionsRoutes;
