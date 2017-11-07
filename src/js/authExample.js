import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Link,
    withRouter
} from 'react-router-dom';

const fakeAuth = {
    isAuthenticated:false,
    authenticate(cb){
        this.isAuthenticated = true;
        setTimeout(cb,100);
    },
    signout(cb){
        this.isAuthenticated = false;
        setTimeout(cb,100);
    }
};
const AuthExample = () => (
    <Router>
        <div>
            <AuthButton />
            <ul>
                <li><Link to='public'>Public Page</Link></li>
                <li><Link to='protected'>Protected Page</Link></li>
            </ul>

            <Route path='/public' component={Public} />
            <Route path='/login' component={Login} />
            <Route path='/protected' render={(props) => (
                fakeAuth.isAuthenticated ? (
                    <h2>protected</h2>
                ) : <Redirect to={{
                    pathname:'login',
                    state:{from:props.location}
                }} />
            )} />
        </div>
    </Router>
);
const AuthButton = withRouter(({history})=>(
    fakeAuth.isAuthenticated ? (
        <p>
            Welcome! <button onClick={()=>{
               fakeAuth.signout(()=>history.push('/'))
            }}>Sign out</button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
));
const PrivateRoute = ({component:Component,path}) => (
    <Route path={path} render={(props)=>(
        fakeAuth.isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname:'/login',
                state:{from:props.location}
            }} />
        )
    )}/>
);
const Public = () => (
    <h3>Public</h3>
);
const Protected = () => (
    <h3>Protected</h3>
);
/*const Login = () => (
    <h3>Login</h3>
);*/
class Login extends React.Component{
    constructor(props){
        super();
        this.state = {
            redirectToReferrer:false
        };
        this.login = this.login.bind(this);
    }

    login(){
        fakeAuth.authenticate(()=>(
            this.setState({
               redirectToReferrer:true
            })
        ));
    }

    render(){
        console.log(this.props);
        const {from} = this.props.location.state || {from:{pathname:'/'}};

        if(this.state.redirectToReferrer){
            return <Redirect to={from} />;
        }
        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}
export default AuthExample;




/*import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

const AuthExample = () => (
  <Router>
    <div>
      <AuthButton/>
      <ul>
        <li><Link to="/public">Public Page</Link></li>
        <li><Link to="/protected">Protected Page</Link></li>
      </ul>
      <Route path="/public" component={Public}/>
      <Route path="/login" component={Login}/>
      <PrivateRoute path="/protected" component={Protected}/>
    </div>
  </Router>
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

const PrivateRoute = ({ component: Component, path }) => (
  <Route path={path} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>
const Login = () => <h3>Login</h3>


export default AuthExample*/