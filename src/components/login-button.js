import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LoginButton = () => {
    //Cette méthode redirige vers le point de terminaison Auth0/authorize pour effectuer le processus d'authentification.
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      onClick={() => loginWithRedirect()}
      variant="primary"
      className="btn-margin"
    >
      Log In
    </Button>
  );
};

export default LoginButton;