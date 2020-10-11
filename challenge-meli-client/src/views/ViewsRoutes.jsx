import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchResults from 'views/SearchResults/SearchResults';
import ItemDetails from 'views/ItemDetails/ItemDetails';

function SectionsRoutes() {
  return (
    <Switch>
      <Route path="/items/:id">
        <ItemDetails />
      </Route>
      <Route path="/items">
        <SearchResults />
      </Route>
    </Switch>
  );
}

export default SectionsRoutes;
