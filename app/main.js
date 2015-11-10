'use strict';

//import '../public/styles/style.scss';
import '../public/less/styles.less';
import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import App from './pages/index';
import About from './pages/about';
import TodoMain from './pages/components/todomain';
import TodoTask from './pages/components/TodoTask';

const routes = (
    <Router>
        <Route component={App}>
            <Route path="/" component={{content:TodoMain}}/>
            <Route path="/todo/:todoId" component={{content:TodoMain, sidebar:TodoTask}} />
            <Route path="/completed" component={{content:TodoMain, content2:About}} />
        </Route>
    </Router>
);


React.render(
    routes,
    document.body
);