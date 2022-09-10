import { useContext } from "react";
import { AppContext} from '../../context';
import { Alert } from '../../components';

export default function Home() {
  const { state } = useContext(AppContext);
  const { user } = state;

  return (
    <section>
      {(!user.name || !user.birthdate) && <Alert type="warning" text="Please, complete the Profile!" />}
    </section>
  );
}
