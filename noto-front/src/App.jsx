import { React, Component } from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import background from "../src/images/karsten-wurth-karsten-wuerth-rafblRbne3o-unsplash.png";
import Navbar from "./common/navbar";
import Home from "./pages/home";
import Footer from "./common/footer";
import About from "./pages/about";
import SignUp from "./logs/signup";
import Signin from "./logs/signin";
import MyCars from "./cars/myCars";
import userService from "./users/userService";
import Logout from "./logs/logout";
import CreateCar from "./cars/createCar";
import EditCar from "./cars/editCar";
import ProtectedRoute from "./common/protectedRoute";
import DeleteCar from "./cars/deleteCar";
import CarsExpenses from "./cars/carsExpenses";
import NewExpense from "./expenses/createExpense";
import Business from "./business/bizPage";
import CreateBiz from "./business/createbusiness";
import FavoritesPage from "./business/favoritesPage";
import MyBizCards from "./business/myBizCards";

class App extends Component {
  state = { user: null };

  componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <div
        className="App d-flex flex-column min-vh-100"
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <header>
          <Navbar user={user} />
        </header>

        <main className="container flex-fill">
          <Switch>
            <ProtectedRoute path="/my-cars/edit/:id" component={EditCar} />
            <ProtectedRoute path="/my-cars/delete/:id" component={DeleteCar} />
            <ProtectedRoute path="/my-cars" component={MyCars} />
            <ProtectedRoute path="/create-car" component={CreateCar} />
            <ProtectedRoute path="/car-page" component={CarsExpenses} />
            <ProtectedRoute path="/create-expense" component={NewExpense} />
            <ProtectedRoute path="/create-business" component={CreateBiz} />
            <ProtectedRoute path="/favorites" component={FavoritesPage} />
            <ProtectedRoute path="/my-biz-cards" component={MyBizCards} />

            <Route path="/about" component={About} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={Signin} />
            <Route path="/logout" component={Logout} />
            <Route path="/business" component={Business} />
            <Route exact path="/" component={Home} />
          </Switch>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
