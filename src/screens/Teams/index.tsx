import { useEffect, useState } from "react";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { getTeams } from "../../api/Teams";

interface Team {
  team_id: string;
  team_name: string;
  logo: string;
}

const renderTeams = (teams: Team[]) =>
  teams.map(({ team_id, team_name, logo }) => (
    <Col key={team_id}>
      <Card style={{ width: "18rem" }} className="">
        <Card.Img variant="top" src={logo} />
        <Card.Body>
          <Card.Title>{team_name}</Card.Title>
          <Button as={Link} to={`/team/${team_id}`} variant="primary">
            Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  ));

export default function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const response = await getTeams();
      setTeams(response);
    }

    fetchApi();
  }, []);

  return (
    <>
      <Container>
        <Row>{renderTeams(teams)}</Row>
      </Container>
    </>
  );
}
