import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/Auth/Login";
import Switch from "react-router-dom/es/Switch";
import Sidebar from "./components/User/Sidebar";
import {useState} from "react";
import createUser from "./components/User/CreateUser";
import EditUser from "./components/User/EditUser";
import showUser from "./components/User/ShowUser";
import User from "./components/User/User";
import Header from "./commons/Header";
import showRoles from "./components/Roles/ShowRoles";
import editRole from "./components/Roles/EditRole";
import addRole from "./components/Roles/AddRole";
import Role from "./components/Roles/Role";

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
                        <Route path="/showRole"component={showRoles}/>
                        <Route path="/edit-role/:id" component={editRole}/>
                        <Route path="/create-role" component={addRole}/>
                        <Route path="/role/:id" component={Role}/>
                    </Switch>
                </div>
            </header>

        </Router>

    );
}

export default App;
