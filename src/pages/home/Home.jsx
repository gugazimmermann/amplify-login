import { useContext } from "react";
import { AppContext} from '../../context';

export default function Home() {
  const { state } = useContext(AppContext);
  const { user } = state;

  return <section>{user && <pre>{JSON.stringify(user, undefined, 2)}</pre>}</section>;
}
