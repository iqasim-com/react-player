import React from 'react';

// Third party imports
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

// Styles import
import './assets/styles/app-styles.scss';

// Component imports
import Sidebar from './Components/Sidebar/sidebar';

// Material imports
import { withStyles } from '@material-ui/styles';

// Routes import
import routes from './router';
import constants from './Config/constants';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: '20px',
  },
});

class App extends React.Component{
    constructor() {
        super();
        this.state = {
            routes: [],
            preloader: true
        }
    }
    componentWillMount() {
        console.log("componentWillMount")

        this.setState({
            routes: routes
        })
    }
    componentDidMount() {
        console.log("componentDidMount")
        // this simulates an async action, after which the component will render the content
        demoAsyncCall().then(() => this.setState({ preloader: false }));
    }

    render() {
        console.log(this.state.routes);
        const { classes } = this.props;

        if(this.state.preloader) {
            return (
                <div className="app-preloader d-flex justify-content-center align-items-center h-100 w-100">
                    <img src={constants.frontend.logo} />
                </div>
            )
        }

        return (
            <React.Fragment>
                    <div className={classes.root}>
                        <Sidebar/>
                        <Router>
                            <Switch>
                                {
                                    this.state.routes.map((res, index) => <Route key={index}
                                                                                exact
                                                                                path={res.path}
                                                                                component={res.component} />)
                                }
                            </Switch>
                        </Router>
                    </div>
            </React.Fragment>
        );
    }
}

function demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
}

export default withStyles(styles)(App);
