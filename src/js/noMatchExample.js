import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'

const NoMatchExample = () => (
    <Router>
        <div>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/old-match'>Old Match, to be redirected</Link></li>
                <li><Link to='/will-match'>Will Match</Link></li>
                <li><Link to='/will-not-match'>Will Not Match</Link></li>
                <li><Link to='/also/will/not/match'>Also Will Not Match</Link></li>
            </ul>

            <Switch>
                <Route exact path='/'  render={()=>(<h2>Home</h2>)}/>
                <Redirect from='/old-match' to='will-match' />
                <Route path='/will-match'  render={()=>(<h2>Matched</h2>)}/>
                <Route render={({location})=>(<h2>No match for {location.pathname}</h2>)}/>
            </Switch>

        </div>
    </Router>
);

export default NoMatchExample;