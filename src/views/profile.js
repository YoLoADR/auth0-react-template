import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Highlight } from "../components";

import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user;

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{name}</h2>
          <p className="lead text-muted">{email}</p>
        </Col>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>
    </Container>
  );
};

export default Profile;



//Le SDK Auth0 React expose un withAuthenticationRequired composant d'ordre supérieur (HOC) que vous pouvez utiliser pour protéger les itinéraires.

// export default withAuthenticationRequired(Profile, {
//   onRedirecting: () => <Loading />,
// });

// User non connecté : Lorsque vous encapsulez vos composants dans le withAuthenticationRequiredcomposant d'ordre supérieur et que les utilisateurs qui ne se sont pas connectés visitent une page qui rend ce composant, votre application React redirige cet utilisateur vers la page de connexion. 

// User connecté : Une fois l'utilisateur connecté, Auth0 redirigera l'utilisateur vers votre application React et Auth0Provideramènera les utilisateurs vers la page à laquelle ils avaient l'intention d'accéder avant la connexion.


// (-) withAuthenticationRequiredpour  : Utiliser withAuthenticationRequiredpour envelopper directement le composant n'est pas le moyen le plus déclaratif de construire une application React. Si vous regardiez les routes définies dans le Appcomposant, vous ne seriez pas en mesure de dire quelles routes sont privées et quelles routes sont publiques.