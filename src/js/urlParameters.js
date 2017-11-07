import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

const ParamExample = () => (
    <Router>
        <div>
            <h2>Accounts</h2>
            <ul>
                <li><Link to='/netflix'>Netflix</Link></li>
                <li><Link to='/zillow-group'>Zillow Group</Link></li>
                <li><Link to='/yahoo'>Yahoo</Link></li>
                <li><Link to='/modus-create'>Modus Create</Link></li>
                <Route path='/:topicId' component={Item}/>
            </ul>
        </div>
    </Router>
);
const Item = ({match}) => (
    <h3>ID:{match.params.topicId}</h3>
);
export default ParamExample;