import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'
const routes = [
    {
        path:'/',
        exact:true,
        sidebar:()=>(<h2>home!</h2>),
        main:()=>(<h2>Home</h2>)
    },{
        path:'/bubblegum',
        sidebar:()=>(<h2>bubblegum!</h2>),
        main:()=>(<h2>Bubblegum</h2>)
    },{
        path:'/shoelaces',
        sidebar:()=>(<h2>shoelaces!</h2>),
        main:()=>(<h2>Shoelaces</h2>)
    }
];
const SideBarExample = () => (
    <Router>
        <div style={{display:'flex'}}>
            <div style={{
                padding:'10px',
                width:'40%',
                background:'#f0f0f0'
            }}>
                <ul style={{listStyleType:'none',padding:0}}>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/bubblegum'>Bubblegum</Link></li>
                    <li><Link to='/shoelaces'>Shoelaces</Link></li>
                </ul>

                {routes.map((route,index)=>(
                    <Route
                        key={index}
                        exact={route.exact}
                        path={route.path}
                        component={route.sidebar}
                    />
                ))}
            </div>

            <div style={{flex:1,padding:'10px'}}>
                {routes.map((route,index)=>(
                    <Route
                        key={index}
                        exact={route.exact}
                        path={route.path}
                        component={route.main}
                    />
                ))}
            </div>
        </div>
    </Router>
);

export default SideBarExample;