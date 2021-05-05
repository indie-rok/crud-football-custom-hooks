import axios from "axios";

const API_URL = "http://localhost:5000/teams";

const getTeams = async () => {
  let teams;
  try {
    teams = await axios.get(API_URL);
    return teams.data;
  } catch (err) {
    return { errors: [err.toString()] };
  }
};

const getTeamDetails = async (team_id: string) => {
  let teamDetails;
  try {
    teamDetails = await axios.get(`${API_URL}/${team_id}`);
    return teamDetails.data;
  } catch (err) {
    return { errors: [err.toString()] };
  }
};

const getTeamPlayers = async (team_id: string) => {
  let teamPlayers;
  try {
    teamPlayers = await axios.get(`${API_URL}/${team_id}/players`);
    return teamPlayers.data;
  } catch (err) {
    return { errors: [err.toString()] };
  }
};

export { getTeams, getTeamDetails, getTeamPlayers };
