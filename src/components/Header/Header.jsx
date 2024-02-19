import React, { useEffect, useRef, useState } from "react";

import { Container } from "reactstrap";
import logo from "../../assets/images/res-logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";

import "../../styles/header.css";

const nav__links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Foods",
    path: "/foods",
  },
  {
    display: "Cart",
    path: "/cart",
  },
  {
    display: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const [visable, setVisable] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  //TOGGLE BUTTON VISIABLE OR NOT
  const toggleVisiable = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 100) {
      setVisable(true);
    } else if (scrolled <= 100) {
      setVisable(false);
    }
  };
  //ADD EVENT LISTNER ===>SCROLL
  window.addEventListener("scroll", toggleVisiable);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  // const toggleMenu = () => {
  //   setShow(!show);
  // };

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  return (
    <header
      className="header shadow-lg"
      style={{
        transition: "all .5s ease",
        backgroundColor: visable ? "transparent" : "white",
      }}
    >
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div
            onClick={() => {
              navigate("/home");
            }}
            className="logo"
          >
            <img src={logo} alt="logo" />
            <h5>Tasty Treat</h5>
          </div>

          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div
            ref={menuRef}
            className="nav__right d-flex align-items-center gap-4"
          >
            <span className="cart__icon" onClick={toggleCart}>
              <i class="ri-shopping-basket-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>

            <span className="user">
              <Link to="/login">
                <i class="ri-user-line"></i>
              </Link>
            </span>

            <span className="mobile__menu" onClick={toggleMenu}>
              <i class="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
