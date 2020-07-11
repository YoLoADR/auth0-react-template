import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      onClick={() =>
        // Vous pouvez faire en sorte que les utilisateurs atterrissent directement sur une page d'inscription au lieu d'une page de connexion en spécifiant le paramètre screen_hint=signup  lors de la redirection /authorize. Ainsi, vous devez passer l'objet suivant à la loginWithRedirect()méthode 
        loginWithRedirect({
          screen_hint: "signup",
        })
      }
      variant="primary"
      className="btn-margin"
    >
      Sign Up
    </Button>
  );
};

export default SignupButton;