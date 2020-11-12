import { lazy } from 'react';
import {
  Switch, Route, Redirect, withRouter,
} from 'react-router-dom';

import { NotFound } from './pages/NotFound';
import { withTracker } from './common/withTracker';

const Home = lazy(() => import('./pages/home'));

function WrappedRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/404" component={NotFound} />
      <Redirect to="/404" />
    </Switch>
  );
}

export const Routes = withRouter(withTracker(WrappedRoutes));
