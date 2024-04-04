import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Flavorly from "../assets/img/Flavorly.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchLogout } from "../redux/actions/auth";

function MyNavbar() {
  const isLoggedIn = useSelector((state) => Boolean(state.auth.loggedProfile));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(fetchLogout());
    toast.success("Logout successful");
    navigate("/");
  };
  return (
    <div>
      <Navbar expand="lg" className="customNav">
        <Container className="d-flex align-items-center">
          <Navbar.Brand href="#home">
            <img
              src={Flavorly}
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              style={{ width: "10em" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto menuStyle">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/allrecipes" className="nav-link">
                All Recipes
              </Link>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              {!isLoggedIn ? (
                <Link to="/login" className="nav-link bg-light rounded rounded-3">
                  Login
                </Link>
              ) : (
                <button onClick={handleLogout} className="nav-link bg-light rounded rounded-3">
                  Logout
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MyNavbar;