import {memo} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import { useNavigate } from "react-router-dom";

function Session({ children }) {
  const store = useStore();
  const navigate = useNavigate();

  useInit(() => {
    store.actions.profile.loadProfile();
  }, []);

  const select = useSelector((state) => ({
    session: state.login.session,
  }));

  if (select.session) {
    return <>{children}</>;
  } else {
    navigate('/login');
  }
}

export default memo(Session);