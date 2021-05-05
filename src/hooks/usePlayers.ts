import { useState, useCallback, useEffect } from "react";

export interface Player {
  name: string;
  team_id: string;
  player_id: string;
}

export default function usePlayers(players: Player[]) {
  const [filteredPlayers, setFilteredPlayers] = useState(players);

  useEffect(() => {
    setFilteredPlayers(players);
  }, [players]);

  const onDelete = (idToDelete: string) => {
    setFilteredPlayers(
      filteredPlayers.filter(
        (player: Player) => player.player_id !== idToDelete
      )
    );
  };

  const onChange = useCallback(
    (ev, player_id) => {
      const indexToModify = filteredPlayers.findIndex(
        (player: Player) => player.player_id === player_id
      );

      const playersToEdit = [...filteredPlayers];

      playersToEdit[indexToModify]["name"] = ev.target.value;

      setFilteredPlayers(playersToEdit);
    },
    [filteredPlayers]
  );

  const addPlayer = useCallback(
    (newPlayerName, teamId) => {
      setFilteredPlayers([
        ...filteredPlayers,
        {
          player_id: Date.now().toString(),
          name: newPlayerName,
          team_id: teamId,
        },
      ]);
    },
    [filteredPlayers]
  );

  return { onDelete, filteredPlayers, onChange, addPlayer };
}
