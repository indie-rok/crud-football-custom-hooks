import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Container, Row, Col, Table, Button } from "react-bootstrap";

import { getTeamDetails, getTeamPlayers } from "../../api/Teams";
import usePlayers, { Player } from "../../hooks/usePlayers";

interface RouteParams {
  team_id: string;
}

interface PlayerProps {
  players: Player[];
  teamId: string;
}

interface TeamDetailInterface {
  description?: string;
}

const renderTeamDetails = ({ description }: TeamDetailInterface) => (
  <h3>{description}</h3>
);

const Players = ({ players = [], teamId }: PlayerProps) => {
  const { onDelete, onChange, filteredPlayers, addPlayer } = usePlayers(
    players
  );
  const [newPlayerName, setNewPlayerName] = useState("");

  return (
    <>
      <h4>Add Player</h4>
      <input
        type="text"
        onChange={(ev) => {
          setNewPlayerName(ev.target.value);
        }}
        value={newPlayerName}
      />
      <Button
        onClick={() => {
          addPlayer(newPlayerName, teamId);
        }}
      >
        Create
      </Button>
      <hr />

      <h4>All Players</h4>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map(({ name, player_id }: Player) => (
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
    </>
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
            <Players players={players} teamId={team_id} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
