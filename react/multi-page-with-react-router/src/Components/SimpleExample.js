import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

const Home = () => {
    return(
        <div>
            Home: <Link to="/works">to Works</Link>
        </div>
    );
};

const Works = () => {
    return(
        <div>
            Works: <Link to="/about">to About</Link>
        </div>
    );
};

const About = () => {
    return(
        <div>
            About: <Link to="/">to Home</Link>
        </div>
    );
};

const SimpleExample = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/works" component={Works}/>
            <Route path="/about" component={About}/>
        </Switch>
    );
};
  
export default SimpleExample;
