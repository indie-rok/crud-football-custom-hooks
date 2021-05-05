import { useEffect, useState } from "react";

import { getTeams } from "../../api/Teams";

export default function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const response = await getTeams();
      console.log(response);
      console.log(teams);
      setTeams(response);
    }

    fetchApi();
  }, []);

  return <div>Teams</div>;
}
