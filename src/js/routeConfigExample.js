import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

//const 没有变量声明提升  需要先定义Sandwiches等，然后再routes中引用
const Sandwiches = ()=>(<h2>Sandwiches</h2>);
const Bus = ()=>(<h2>Bus</h2>);
const Cart = ()=>(<h2>Cart</h2>);
const Tacos = ({routes})=>(
    <div>
        <h2>Tacos</h2>
        <ul>
            <li><Link to='/tacos/bus'>Bus</Link></li>
            <li><Link to='/tacos/cart'>Cart</Link></li>
        </ul>
        {routes.map((route,index)=>(
            <RouteWithSubRoutes
                key={index}
                path={route.path}
                component={route.component}
                routes={route.routes} />
        ))}
    </div>
);
const routes = [
    {
        path:'/sandwiches',
        component:Sandwiches
    },{
        path:'/tacos',
        component:Tacos,
        routes:[
            {
                path:'/tacos/bus',
                component:Bus
            },{
                path:'/tacos/cart',
                component:Cart
            }

        ]
    }
];
const RouteWithSubRoutes = (route)=>(
//    <route.component routes={route.routes}>
      <Route path={route.path} render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes}/>
      )}/>
);
const RouteConfigExample = () => (
    <Router>
        <div>
            <ul>
                <li><Link to='/tacos'>Tacos</Link></li>
                <li><Link to='/sandwiches'>Sandwiches</Link></li>
            </ul>

            {routes.map((route,index)=>(
                <RouteWithSubRoutes
                    key={index}
                    path={route.path}
                    component={route.component}
                    routes={route.routes} />
            ))}
        </div>
    </Router>
);

export default RouteConfigExample;



