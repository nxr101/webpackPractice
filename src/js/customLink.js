import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

const CustomLinkExample = () => (
    <Router>
        <div>
            <CustomMenuLink to='/' activeWhenExact={true} label='Home'/>
            <CustomMenuLink to='/about' label='About' />
            <hr/>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
        </div>
    </Router>
);
const CustomMenuLink = ({to,activeWhenExact,label}) => (
    <Route path={to} exact={activeWhenExact} children={({match}) => (
        <div className={match?'active':''}>
            {match?'>':''}<Link to={to}>{label}</Link>
        </div>
    )}/>
);
const Home = () => (
    <h3>Home</h3>
);
const About = () => (
    <h3>About</h3>
);
export default CustomLinkExample;