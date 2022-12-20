import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then(users => this.setState({ robots: users }))
    .catch(error => console.log(error));    
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render () {
    const { robots, searchfield } = this.state;

    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    if (!robots.length) {
      return <h1 className='tc f1'>Loading kittens</h1>;
    } else {
      return (
        <div className='tc'>
          <h1 className='f1'>Kittens</h1>
          <SearchBox searchChange={ this.onSearchChange }/>
          <Scroll>
            <ErrorBoundry>
              <CardList robots={ filteredRobots } />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
    }
    
  }
}

export default App;