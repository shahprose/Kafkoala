import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id='main'>
        <div id='content'>
          <header id='title'>
            <h1>{'{ Kafkoala }'}</h1>
            <div id='subheader'>Kafka Cluster Management</div>
          </header>
          <div id='homebtns'>
            <Link to='/Topics'>
              <button>Topics</button>
            </Link>
            <Link to='/Producers'>
              <button>Producers</button>
            </Link>
            <Link to='/Consumers'>
              <button>Consumers</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
