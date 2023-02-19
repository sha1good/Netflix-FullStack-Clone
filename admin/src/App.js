import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";
import NewMovie from "./pages/newMovie/NewMovie";
import Lists from "./pages/Lists/Lists";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import  List from "./pages/list/List";
import  NewList from "./pages/newList/NewList";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        {!user && (
          <Route path="/">
            <Login />
          </Route>
        )}
        {user && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/movies">
                <MovieList />
              </Route>
              <Route path="/movie/:movieId">
                <Movie />
              </Route>
              <Route path="/newmovie">
                <NewMovie />
              </Route>
              <Route path="/lists">
                <Lists/>
              </Route>
              <Route path="/list/:listId">
                <List/>
              </Route>
              <Route path="/newlist">
                <NewList/>
              </Route>
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
