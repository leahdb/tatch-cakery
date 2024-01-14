import useLocalStorage from "../../services/utils/local-storage";
import LogoutButton from "../login/LogoutButton";

const DashHome = (props) => {
  const [firstName] = useLocalStorage("user_first_name", "");

  return (
    <section>
      <h3>Welcome, {firstName}</h3>
      <LogoutButton />
    </section>
  );
};

export default DashHome;
