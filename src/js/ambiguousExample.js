import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom'

const AmbiguousExample = () => (
    <Router>
        <div>
            <ul>
                <li><Link to='/about'>About Us (static)</Link></li>
                <li><Link to='/company'>Company (static)</Link></li>
                <li><Link to='/kim'>Kim (dynamic)</Link></li>
                <li><Link to='/chris'>Chris (dynamic)</Link></li>
            </ul>

            <Switch>
                <Route path='/about'  render={()=>(<h2>About</h2>)}/>
                <Route path='/company'  render={()=>(<h2>Company</h2>)}/>
                <Route path='/:userId'  render={({match})=>(<h2>User:{match.params.userId}</h2>)}/>
            </Switch>

        </div>
    </Router>
);

export default AmbiguousExample;