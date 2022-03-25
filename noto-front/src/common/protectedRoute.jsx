import userService from "../users/userService";
import { Route, Redirect } from "react-router";

const ProtectedRoute = ({ render, component: Component, ...rest }) => {
  const user = userService.getCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          return (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location },
              }}
            />
          );
        }

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
