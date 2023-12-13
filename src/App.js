import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Products from './pages/Products';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Checkout from './pages/Checkout';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/signup",
    element:<SignUp/>
  },
  {
    path:"/login",
    element:<SignIn/>
  },
  {
    path:"/products",
    element:<Products/>
  },
  {
    path:"/cart",
    element:<Cart/>
  },
  {
    path:"/checkout",
    element:<Checkout/>
  }
])

function App() {
  return (
    <RouterProvider router={router}>
    <div className="App">
      <Home/>
      <SignUp/>
      <SignIn/>
      <Products/>
    </div>
    </RouterProvider>
  );
}

export default App;
