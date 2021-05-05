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

export { getTeams };
