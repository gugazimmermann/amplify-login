import { useOutletContext } from "react-router-dom";

export default function Home() {
  const { user } = useOutletContext();

  return <section>{user && <pre>{JSON.stringify(user, undefined, 2)}</pre>}</section>;
}
