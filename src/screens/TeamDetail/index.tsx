import { useParams } from "react-router-dom";

interface RouteParams {
  id: string;
}

export default function TeamDetail() {
  let { id } = useParams<RouteParams>();

  return <div>{id}</div>;
}
