import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React,{ Component} from 'react';
import AddTutorial from './components/addTutorialComponent';
import TutorialList from './components/tutorialListComponent';
import { Switch,Link,Route } from 'react-router-dom';
import EditTutorial from './components/editTutorialComponent';


class App extends Component {

  render() {
    return (
      <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          TutorialList
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/tutorials"]} component={TutorialList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route path="/tutorials/:id" component={EditTutorial} />
        </Switch>
      </div>
    </div>


    );
  }
}

export default App;
