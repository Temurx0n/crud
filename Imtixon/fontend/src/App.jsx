import './App.css';
import Registar from './components/registar/Registar';
import Login from './components/login/Login';
import Home from './components/home/Home';
import { Route } from 'react-router-dom';
import Users from './components/users/Users';
import Cars from './components/cars/Cars';
import Animals from './components/animals/Animals';
import Fruits from './components/fruits/Fruits';
import Admin from './components/admin/Admin';
import TestAdmin from './components/testAdmins/testAdmins';

function App() {

  if (window.location.pathname == '/') {
    localStorage.removeItem('admin')
  } if (window.location.pathname == '/cars') {
    localStorage.removeItem('admin')
  } if (window.location.pathname == '/animals') {
    localStorage.removeItem('admin')
  } if (window.location.pathname == '/fruits') {
    localStorage.removeItem('admin')
  } if (window.location.pathname == '/registar') {
    localStorage.removeItem('admin')
  } if (window.location.pathname == '/login') {
    localStorage.removeItem('admin')
  }

  if (window.location.pathname == '/admin' && !localStorage.getItem('admin')) {
    window.location.pathname = '/'
  }

  if (window.location.pathname == '/' && !localStorage.getItem('token')) {
    window.location = '/login';
  } if (window.location.pathname == '/cars' && !localStorage.getItem('token')) {
    window.location = '/login';
  } if (window.location.pathname == '/fruits' && !localStorage.getItem('token')) {
    window.location = '/login';
  } if (window.location.pathname == '/animals' && !localStorage.getItem('token')) {
    window.location = '/login';
  }


  if (window.location.pathname == '/registar') {
    localStorage.clear()
  } if (window.location.pathname == '/login') {
    localStorage.clear()
  }

  // controller('/');
  // controller('/users');
  // controller('/cars');
  // controller('/animals');
  // controller('/fruits');

  // locRemove('/');
  // locRemove('/users');
  // locRemove('/cars');
  // locRemove('/animals');
  // locRemove('/fruits');
  // locRemove('/login');
  // locRemove('/registar');
  // locRemove('/testAdmins');


  return (
    <>

      <Route path='/testAdmins'>
        <TestAdmin />
      </Route>

      <Route path='/registar'>
        <Registar />
      </Route>

      <Route path='/login'>
        <Login />
      </Route>

      <Route exact path='/'>
        <Home />
      </Route>

      <Route path='/cars'>
        <Cars />
      </Route>

      <Route path='/animals'>
        <Animals />
      </Route>

      <Route path='/fruits'>
        <Fruits />
      </Route>

      <Route path='/admin'>
        <Admin />
      </Route>



    </>
  );
}

export default App;
