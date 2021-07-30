import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	Typography,
	useScrollTrigger,
	Slide,
	useMediaQuery,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useStyles from '../styles';
import { Menu, Home, Store, Brightness1 } from '@material-ui/icons';
import logo from '../../vector/logo-name.svg';

function HideOnScroll(props) {
	const { children } = props;
	const trigger = useScrollTrigger();

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

export default function Navbar(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [page, setPage] = useState(window.location.pathname);
	const [open, setOpen] = useState(false);
	const drawerNav = useMediaQuery(theme.breakpoints.down('xs'));

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setOpen(open);
	};

	async function onChangeHome() {
		setPage('/');
	}

	async function onChangeStores() {
		setPage('/stores');
	}

	async function onChangeVariants() {
		setPage('/variants');
	}

	return (
		<>
			<HideOnScroll {...props}>
				<AppBar className={classes.appBar}>
					{drawerNav ? (
						<Toolbar>
							<Link className={classes.link} to={'/'} onClick={onChangeHome}>
								<img
									src={logo}
									alt="logo"
									width="90%"
									style={{ paddingTop: 5 }}
								/>
							</Link>
							<nav className={classes.nav}>
								<IconButton
									aria-label="menu"
									className={classes.menuButton}
									onClick={toggleDrawer(true)}
								>
									<Menu />
								</IconButton>
							</nav>
						</Toolbar>
					) : (
						<Toolbar>
							<Link className={classes.link} to={'/'} onClick={onChangeHome}>
								<img
									src={logo}
									alt="logo"
									width="90%"
									style={{ paddingTop: 5 }}
								/>
							</Link>
							<nav className={classes.nav}>
								<Link className={classes.link} to={'/'} onClick={onChangeHome}>
									<Typography
										variant="body2"
										className={
											page === '/' ? classes.navItemActive : classes.navItem
										}
									>
										Home
									</Typography>
								</Link>
								<Link
									className={classes.link}
									to={'/stores'}
									onClick={onChangeStores}
								>
									<Typography
										variant="body2"
										className={
											page.substring(0, 7) === '/stores'
												? classes.navItemActive
												: classes.navItem
										}
									>
										Stores
									</Typography>
								</Link>
								<Link
									className={classes.link}
									to={'/variants'}
									onClick={onChangeVariants}
								>
									<Typography
										variant="body2"
										className={
											page.substring(0, 9) === '/variants'
												? classes.navItemActive
												: classes.navItem
										}
									>
										Variants
									</Typography>
								</Link>
							</nav>
						</Toolbar>
					)}
				</AppBar>
			</HideOnScroll>
			<Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
				<nav
					role="presentation"
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
					style={{ width: 250 }}
				>
					<List>
						<Link className={classes.link} to={'/'}>
							<ListItem button key={'Home'}>
								<ListItemIcon>
									<Home className={classes.menuButton} />
								</ListItemIcon>
								<ListItemText primary={'Home'} />
							</ListItem>
						</Link>
						<Link className={classes.link} to={'/stores'}>
							<ListItem button key={'Stores'}>
								<ListItemIcon>
									<Store className={classes.menuButton} />
								</ListItemIcon>
								<ListItemText primary={'Stores'} />
							</ListItem>
						</Link>
						<Link className={classes.link} to={'/variants'}>
							<ListItem button key={'Variants'}>
								<ListItemIcon>
									<Brightness1 className={classes.menuButton} />
								</ListItemIcon>
								<ListItemText primary={'Variants'} />
							</ListItem>
						</Link>
					</List>
				</nav>
			</Drawer>
		</>
	);
}
