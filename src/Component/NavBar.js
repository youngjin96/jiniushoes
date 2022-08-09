import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../Environment/Firebase'

import { Link, useNavigate } from 'react-router-dom';

const pages = ['SHOP', 'COMMUNITY'];

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn ]= useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setIsLoggedIn(true);
            } else {
              setIsLoggedIn(false);
            }
        })
    }, []);

    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onClickMypage = () => {
        setAnchorElUser(null);
        navigate("/mypage");
    }

    const onClickLogout = () => {
        signOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
            alert(error.message);
        });
    }
    return (
        <AppBar position="sticky" style={{ background: 'white', height: "auto" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* 화면 줄기 전 홈 */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                        }}
                    >
                        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                            Home
                        </Link>
                    </Typography>
                    {/* 화면 줄었을 때 */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        {/* 햄버거 버튼 */}
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            style={{ color: 'black' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* 햄버거 눌렀을 때 리스트 */}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map(page => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link to={page} style={{ textDecoration: 'none', textTransform: 'none', color: "black" }}>
                                            {page}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* 화면 줄었을 때 홈 버튼 */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'black',
                        }}
                    >
                        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                            Home
                        </Link>
                    </Typography>
                    {/* 화면 줄기 전에 메뉴 버튼들 */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 15, gap: 14 }}>
                        {pages.map((page) => (
                            <Typography
                                key={page}
                                component="div"
                                noWrap
                                sx={{ my: 4 }}
                            >
                                <Link to={page} style={{ textDecoration: 'none', textTransform: 'none', color: "black" }}>
                                    {page}
                                </Link>
                            </Typography>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {isLoggedIn ? (
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="../img/1.png" />
                                </IconButton>
                            </Tooltip>
                        ) : (
                                <Typography
                                    component="div"
                                    noWrap
                                    sx={{ my: 4 }}
                                >
                                    <Link to="login" style={{ textDecoration: 'none', textTransform: 'none', color: "black" }}>
                                        LOGIN
                                    </Link>
                                </Typography>
                            )
                        }
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={onClickMypage}>
                                <Typography variant="button">
                                    마이페이지
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={onClickLogout}>
                                <Typography variant="button">
                                    로그아웃
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
};

export default NavBar