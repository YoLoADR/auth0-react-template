import React, { useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { Highlight } from "../components";
import { useAuth0 } from "@auth0/auth0-react";

export const ExternalApi = () => {
  //Vous utilisez le useState() hook React pour mettre à jour l'interface utilisateur chaque fois que l'un des appels d'API décrits se termine avec succès.
  const [message, setMessage] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const { getAccessTokenSilently } = useAuth0();

  //Vous ajoutez une callApi() méthode qui exécute une demande d'API publique.
  const callApi = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/public-message`);

      const responseData = await response.json();

      setMessage(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  };

  //Vous ajoutez une callSecureApi()méthode qui exécute une demande d'API sécurisée en (a) obtenant le jeton d'accès d'Auth0 et (b) passant ce jeton d'accès en tant qu'identifiant de support dans l'en-tête d'autorisation de la demande.
  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiUrl}/api/private-message`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setMessage(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Container className="mb-5">
      <h1>External API</h1>
      <p>
        You use will use a button to call an external API using an access token,
        and the API will validate it using the API's audience value.{" "}
        <strong>This route should be private</strong>.
      </p>
      <ButtonGroup>
        <Button onClick={callApi} color="primary" className="mt-5">
          Get Public Message
        </Button>
        <Button onClick={callSecureApi} color="primary" className="mt-5">
          Get Private Message
        </Button>
      </ButtonGroup>

      {message && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <Highlight>{JSON.stringify(message, null, 2)}</Highlight>
        </div>
      )}
    </Container>
  );
};

export default ExternalApi;


//  Vous ne devez pas stocker de jetons localStorage. Pourquoi?
// Le stockage des jetons dans le stockage local du navigateur offre une persistance dans les actualisations de page et les onglets du navigateur, mais si un attaquant peut exécuter JavaScript dans l'application monopage (SPA) à l'aide d'une attaque de script intersite (XSS) , il peut récupérer les jetons stockés dans le local stockage .
// Une vulnérabilité conduisant à une attaque XSS réussie peut se trouver dans le code source du SPA ou dans tout code JavaScript tiers inclus dans le SPA, tel que Bootstrap, jQuery ou Google Analytics.