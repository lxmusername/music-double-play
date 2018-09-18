import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';


import App from './App';
import Player from '../pages/Player';
import MusicList from '../pages/MusicList';

//路由控件
export default class Root extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={Player}></IndexRoute>
                    <Route path='/MusicList' component={MusicList} />
                </Route>
            </Router>
        )
    }





}