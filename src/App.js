import './App.css';
import GetAllStudentDetails from './GetAllStudentDetails';
import StudentComponent from './StudentComponent';
import { Route, BrowserRouter as Router, Routes, Link, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/getGender" className="slidebarText">Find Gender</Link>
            </li>
            <li>
              <Link to="/getCountry" className="slidebarText">Find Nationality</Link>
            </li>
          </ul>
        </nav>

        <Switch>
            {/*<Route path="/"><StudentComponent /> </Route>*/}
            <Route path="/getGender"><StudentComponent /> </Route>
            <Route path="/getCountry"><GetAllStudentDetails /> </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
