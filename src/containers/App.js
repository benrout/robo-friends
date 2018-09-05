import React, { Component } from 'react';
import Searchbox from '../components/Searchbox'
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css'

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchField: ""
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users}));
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })
    }

    render() {
        const { robots, searchField } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        if (robots.length === 0) {
            return <h1>Loading robots...</h1>
        }
        return (
            <div className="tc">
                <div className="header">    
                    <h1 className="f1">RoboFriends</h1>
                    <Searchbox searchChange={this.onSearchChange} />
                </div>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }
}

export default App;