import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import { Link as LinkRouter, useLocation } from 'react-router-dom';
// Components
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets
import LogoIcon from "../../assets/svg/Logo";
import BurgerIcon from "../../assets/svg/BurgerIcon";
import { Avatar, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack } from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useSelector } from "react-redux";

export default function TopNavbar({showHeader}) {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);
  const location = useLocation();
  const currentUser = useSelector(state => state.users.currentUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [action, setAction] = React.useState('');
  const openMenu = Boolean(anchorEl);
  // const dispatch = useDispatch();

  const handleCloseMenu = () => {
    // dispatch(clearCurrentUser());
    setAction('Login');
    setAnchorEl(null);
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);


  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
        {showHeader?
          <Link className="pointer flexNullCenter" to="home" smooth={true}>
            <LogoIcon />
            <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
              testetic
            </h1>
          </Link> :
          <LinkRouter to='/' className="pointer flexNullCenter" >
            <LogoIcon />
            <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
              testetic
            </h1>
          </LinkRouter>
        }
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          {showHeader? 
          <UlWrapper className="flexNullCenter">
            {!currentUser.id ? 
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="home" spy={true} smooth={true} offset={-80}>
                Home
              </Link> 
            </li> : 
            <li className="semiBold font15 pointer">
              <LinkRouter to='/user' style={{ padding: "10px 30px 10px 0" }}>
                My dashboard
              </LinkRouter>
            </li>
            }
            {!currentUser.id ? 
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="services" spy={true} smooth={true} offset={-80}>
                Services
              </Link>
            </li> : null}
            {!currentUser.id ? 
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="projects" spy={true} smooth={true} offset={-80}>
                Projects
              </Link>
            </li> : null}
            {!currentUser.id ? 
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="blog" spy={true} smooth={true} offset={-80}>
                Blog
              </Link>
            </li> : null}
            {!currentUser.id ? 
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="pricing" spy={true} smooth={true} offset={-80}>
                Pricing
              </Link>
            </li> : null}
            {!currentUser.id ? 
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="contact" spy={true} smooth={true} offset={-80}>
                Contact
              </Link>
            </li> : null}
          </UlWrapper> : null
        }
          
          {currentUser.id? (<>
            <IconButton 
              id="basic-button"
              aria-controls={openMenu ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
              onClick={handleClickMenu}
              style={{marginLeft: "15px"}}
              color="inherit" 
              size="small"
              >
                <Stack direction="row" spacing={4}>
                  {!currentUser.avatar? 
                  <Avatar sx={{ width: 16, height: 16 }} {...stringAvatar('Kent Dodds')} /> :
                  <Avatar sx={{ width: 16, height: 16 }} alt={`${currentUser.firstName} ${currentUser.lastName}`} src={currentUser.avatar} />}
                  {`${currentUser.firstName} ${currentUser.lastName}`}
                </Stack>
            </IconButton>
            <Menu
              // size="small"
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleCloseMenu}>
                <ListItemIcon>
                  <ManageAccountsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
              <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
            </Menu></>) : 
            <UlWrapperRight className="flexNullCenter">
              <li className="semiBold font15 pointer">
                <LinkRouter to='/signup' style={{ padding: "10px 30px 10px 0" }}>
                  Sign Up
                </LinkRouter>
              </li>
              <li className="semiBold font15 pointer">
                <LinkRouter to='/login' state={location.pathname} style={{ padding: "10px 30px 10px 0" }}>
                  Log in
                </LinkRouter>
              </li>
              <li className="semiBold font15 pointer flexCenter" to='/orgregistration'>
                <LinkRouter to='/orgregistration' className="radius8 lightBg" style={{ padding: "10px 15px" }}>
                  Get Started
                </LinkRouter>
              </li> 
            </UlWrapperRight>}
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;


