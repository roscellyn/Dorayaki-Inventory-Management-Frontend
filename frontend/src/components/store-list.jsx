import React, { useState, useEffect } from 'react';
import StoreDataService from '../services/store.jsx';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import useStyles from '../styles.js';
import { useTheme } from '@material-ui/core/styles';
import {
	InputBase,
	IconButton,
	Grid,
	Card,
	CardContent,
	CardActions,
	Typography,
	Button,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Tooltip,
	useMediaQuery,
} from '@material-ui/core';
import { Search, Delete } from '@material-ui/icons';
import AddNewStore from './add-new-store.jsx';

const BootstrapInput = withStyles((theme) => ({
	root: {
		'label + &': {
			marginTop: theme.spacing(1.7),
		},
	},
	input: {
		borderRadius: 6,
		position: 'relative',
		border: '1px solid rgba(0, 97, 134, 0.4)',
		fontSize: 12,
		minWidth: 36,
		padding: '8px 26px 8px 12px',
		'&:focus': {
			borderRadius: 6,
			borderColor: 'rgba(0, 97, 134, 0.4)',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
	},
}))(InputBase);

const StoreList = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const [stores, setStores] = useState([]);
	const [search, setSearch] = useState('');
	const [sort, setSort] = React.useState('');
	const alignSearch = useMediaQuery(theme.breakpoints.down('xs'));

	useEffect(() => {
		retrieveStores();
	}, []);

	const onChangeSort = (e) => {
		setSort(e.target.value);
	};

	const onChangeSearch = (e) => {
		const search = e.target.value;
		setSearch(search);
	};

	const retrieveStores = () => {
		StoreDataService.getAll()
			.then((response) => {
				console.log(response.data);
				setStores(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const retrieveStoresAZ = () => {
		StoreDataService.getAllSortedAZ()
			.then((response) => {
				console.log(response.data);
				setStores(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const retrieveStoresZA = () => {
		StoreDataService.getAllSortedZA()
			.then((response) => {
				console.log(response.data);
				setStores(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const deleteStore = (storeId, index) => {
		StoreDataService.deleteStore(storeId)
			.then((response) => {
				setStores((prevState) => {
					const newStores = prevState.filter((store) => {
						return store._id !== storeId;
					});
					return newStores;
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const findByName = () => {
		if (search === '') {
			retrieveStores();
		} else {
			StoreDataService.find(search)
				.then((response) => {
					console.log(response.data);
					setStores(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	return (
		<div>
			<div className={classes.containerTop}>
				{alignSearch ? (
					<>
						<span>
							<div style={{ position: 'relative', marginBottom: 15 }}>
								<span className={classes.span} style={{ marginRight: 10 }}>
									<FormControl className={classes.formControlSort}>
										<InputLabel
											htmlFor="demo-customized-select-label"
											className={classes.inputLabelSort}
										>
											Sort By
										</InputLabel>
										<Select
											labelId="demo-customized-select-label"
											id="demo-customized-select"
											value={sort}
											onChange={onChangeSort}
											input={<BootstrapInput />}
											className={classes.selectSort}
										>
											<MenuItem value="" onClick={retrieveStores}>
												<em>None</em>
											</MenuItem>
											<MenuItem value={1} onClick={retrieveStoresAZ}>
												A-Z
											</MenuItem>
											<MenuItem value={2} onClick={retrieveStoresZA}>
												Z-A
											</MenuItem>
										</Select>
									</FormControl>
								</span>
								<span
									className={classes.span}
									style={{ position: 'absolute', bottom: 0, width: '100%' }}
								>
									<AddNewStore edit={false} stores={stores} />
								</span>
							</div>
							<form className={classes.search} autoComplete="off">
								<InputBase
									className={classes.searchInput}
									placeholder="Search..."
									inputProps={{ 'aria-label': 'search' }}
									value={search}
									onChange={onChangeSearch}
								/>
								<IconButton
									className={classes.searchIcon}
									aria-label="search"
									onClick={findByName}
								>
									<Search fontSize="small" />
								</IconButton>
							</form>
						</span>
					</>
				) : (
					<>
						<span className={classes.span} style={{ marginRight: 10 }}>
							<FormControl className={classes.formControlSort}>
								<InputLabel
									htmlFor="demo-customized-select-label"
									className={classes.inputLabelSort}
								>
									Sort By
								</InputLabel>
								<Select
									labelId="demo-customized-select-label"
									id="demo-customized-select"
									value={sort}
									onChange={onChangeSort}
									input={<BootstrapInput />}
									className={classes.selectSort}
								>
									<MenuItem value="" onClick={retrieveStores}>
										<em>None</em>
									</MenuItem>
									<MenuItem value={1} onClick={retrieveStoresAZ}>
										A-Z
									</MenuItem>
									<MenuItem value={2} onClick={retrieveStoresZA}>
										Z-A
									</MenuItem>
								</Select>
							</FormControl>
						</span>
						<span className={classes.span}>
							<AddNewStore edit={false} stores={stores} />
						</span>
						<span
							className={classes.span}
							style={{ position: 'absolute', right: 0 }}
						>
							<form className={classes.search} autoComplete="off">
								<InputBase
									className={classes.searchInput}
									placeholder="Search..."
									inputProps={{ 'aria-label': 'search' }}
									value={search}
									onChange={onChangeSearch}
								/>
								<IconButton
									className={classes.searchIcon}
									aria-label="search"
									onClick={findByName}
								>
									<Search fontSize="small" />
								</IconButton>
							</form>
						</span>
					</>
				)}
			</div>
			{stores.length ? (
				<Grid container spacing={4} className={classes.gridContainer}>
					{stores.map((store, index) => {
						const alamat = `${store.jalan}, ${store.kecamatan}, ${store.provinsi}`;
						return (
							<Grid item key={index} xs={12} sm={6} md={4}>
								<Card className={classes.card}>
									<CardContent className={classes.cardContent}>
										<Typography
											variant="h6"
											gutterBottom
											className={classes.subtitle2}
										>
											{store.nama}
										</Typography>
										<Typography className={classes.description}>
											Alamat : {alamat}
										</Typography>
										<Typography className={classes.description}>
											No. Telp : {store.noTelp}
										</Typography>
									</CardContent>
									<CardActions className={classes.storeCardBottom}>
										<Link className={classes.link} to={'/stores/' + store._id}>
											<Button
												className={classes.stockButton}
												variant="contained"
												disableElevation
											>
												Check Stock
											</Button>
										</Link>
										<span
											style={{
												position: 'absolute',
												right: 0,
												bottom: 0,
												display: 'flex',
												padding: 16,
											}}
										>
											<AddNewStore edit={true} store={store} stores={stores} />
											<Tooltip title="Delete">
												<IconButton
													aria-label="Delete"
													className={classes.deleteButton}
													onClick={() => deleteStore(store._id, index)}
												>
													<Delete fontSize="small" />
												</IconButton>
											</Tooltip>
										</span>
									</CardActions>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			) : (
				<Typography
					variant="h6"
					style={{
						textAlign: 'center',
						color: '#818181',
						fontWeight: 400,
						marginTop: '10vh',
					}}
				>
					There are no stores here
				</Typography>
			)}
		</div>
	);
};

export default StoreList;
