import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/Login";
import Switch from "react-router-dom/es/Switch";
import Sidebar from "./components/Sidebar";
import {useState} from "react";
import createUser from "./components/CreateUser";
import EditUser from "./components/EditUser";
import showUser from "./components/ShowUser";
import User from "./components/User";
import Header from "./commons/Header";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return (
        <Router>
            {/*{isAuthenticated && <div className="App"><Sidebar/></div>}*/}
            <header className="container">
                <div className="">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/login" component={Login} />
                        <Route path="/createUser" component={createUser} />
                        <Route path="/edit-user/:id" component={EditUser} />
                        <Route path="/user/:id" component={User} />
                        <Route path="/showUser" component={showUser} />

                    </Switch>
                </div>
            </header>

        </Router>

    );
}

export default App;
