import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
import Dashboard from '../pages/DashBoard';
import Counter from '../features/counter/Counter';
import BlogCreate from '../pages/BlogCreate';
import SignIn from '../pages/SignIn';
import BlogDetail from '../pages/BlogDetail';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} exact isPrivate title='Dashboard' />
      <Route path="/counter" component={Counter} exact isPrivate title='Counter' />
      <Route path="/blog/create" component={BlogCreate} exact isPrivate title='Blog Create' />
      <Route path="/blog/:id" component={BlogDetail} isPrivate title='Blog Detail' />

      {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
      <Route component={SignIn} />
    </Switch>
  );
}
