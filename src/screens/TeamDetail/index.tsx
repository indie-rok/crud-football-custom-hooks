import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import { Container, Row, Col, Table, Button } from "react-bootstrap";

import { getTeamDetails, getTeamPlayers } from "../../api/Teams";

interface RouteParams {
  team_id: string;
}

interface TeamDetails {
  team_id: string;
  description: string;
}

const renderTeamDetails = ({ description }: any) => <h3>{description}</h3>;

function usePlayers(players: any) {
  const [filteredPlayers, setFilteredPlayers] = useState(players);

  useEffect(() => {
    setFilteredPlayers(players);
  }, [players]);

  const onDelete = (idToDelete: string) => {
    setFilteredPlayers(
      filteredPlayers.filter((player: any) => player.player_id !== idToDelete)
    );
  };

  const onChange = useCallback(
    (ev, player_id) => {
      const indexToModify = filteredPlayers.findIndex(
        (player: any) => player.player_id === player_id
      );

      const playersToEdit = [...filteredPlayers];

      playersToEdit[indexToModify]["name"] = ev.target.value;

      setFilteredPlayers(playersToEdit);
    },
    [filteredPlayers]
  );

  return { onDelete, filteredPlayers, onChange };
}

const Players = ({ players = [] }: any) => {
  const { onDelete, onChange, filteredPlayers } = usePlayers(players);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filteredPlayers.map(({ name, player_id }: any) => (
          <tr key={player_id}>
            <td>
              <input
                type="text"
                value={name}
                onChange={(ev) => {
                  onChange(ev, player_id);
                }}
              />
            </td>
            <td>
              <Button
                variant="danger"
                onClick={() => {
                  onDelete(player_id);
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default function TeamDetail() {
  const [teamDetails, setTeamDetails] = useState({});
  const [players, setPlayers] = useState([]);
  let { team_id } = useParams<RouteParams>();

  useEffect(() => {
    async function fetchApi() {
      const resultTeamDetails = await getTeamDetails(team_id);
      const resultTeamPlayers = await getTeamPlayers(team_id);

      setTeamDetails(resultTeamDetails);
      setPlayers(resultTeamPlayers);
    }

    fetchApi();
  }, [team_id]);

  return (
    <>
      <Container>
        <Row>
          <Col>{renderTeamDetails(teamDetails)}</Col>
          <Col>
            <h4>Players</h4>
            <Players players={players} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
