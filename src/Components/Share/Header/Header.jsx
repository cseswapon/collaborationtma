import { useEffect, useState } from "react";
import useDb from "../../../hooks/useDb";
import { Link } from "react-router-dom";

const Header = () => {
  const [data, setData] = useState({});
  function logout() {
    // localStorage.clear();
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    sessionStorage.clear();
    window.location.reload();
  }

  const auth = useDb();

  function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  //   const userInfo = localStorage.getItem("user-info");
  let userEmail = getCookie("user_login");
  // console.log(userEmail);
  //  console.log(data);
  useEffect(() => {
    auth.getUserDataByEmail(userEmail, (user) => {
      if (user) {
        setData(user);
      } else {
        console.log("User not found.");
      }
    });
  }, []);

  return (
    <div className="d-flex align-items-center container justify-content-between py-3">
      <div>
        <Link className="text-decoration-none me-3" to="/">
          Home
        </Link>
        <Link className="text-decoration-none me-3" to="/createTeam">
          Create Team
        </Link>
        <Link className="text-decoration-none me-3" to="/taskTeam">
          Create Team Taxk
        </Link>
      </div>
      <div className="d-flex align-items-center">
        <img
          className="mx-2 img-thumbnail"
          src={data.profilePicture}
          width={70}
          height={70}
          alt="avatar"
        />
        <strong className="mx-2">{data?.email}</strong>
        <button className="mx-2 btn btn-danger" onClick={logout}>
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Header;
