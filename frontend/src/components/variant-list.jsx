import React, { useState, useEffect } from 'react';
import VariantDataService from '../services/variant.jsx';
import StoreDataService from '../services/store.jsx';

import { withStyles } from '@material-ui/core/styles';
import useStyles from '../styles.js';
import { useTheme } from '@material-ui/core/styles';
import {
	InputBase,
	IconButton,
	Grid,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Tooltip,
	useMediaQuery,
	Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Search, Delete } from '@material-ui/icons';
import AddNewVariant from './add-new-variant.jsx';

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

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const VariantList = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const [variants, setVariants] = useState([]);
	const [stores, setStores] = useState([]);
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState('');
	const [openSnackbarDel, setOpenSnackbarDel] = useState(false);
	const alignSearch = useMediaQuery(theme.breakpoints.down('xs'));

	useEffect(() => {
		retrieveVariants();
	}, []);

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

	const retrieveVariants = () => {
		VariantDataService.getAll()
			.then((response) => {
				console.log(response.data);
				setVariants(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const retrieveVariantsAZ = () => {
		VariantDataService.getAllSortedAZ()
			.then((response) => {
				console.log(response.data);
				setVariants(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const retrieveVariantsZA = () => {
		VariantDataService.getAllSortedZA()
			.then((response) => {
				console.log(response.data);
				setVariants(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const deleteVariant = (variantId, index) => {
		var found = false;
		stores.forEach((store) => {
			store.stok.forEach((stok) => {
				if (stok.variantId === variantId) {
					found = true;
				}
			});
		});
		if (found) {
			setOpenSnackbarDel(true);
		} else {
			VariantDataService.deleteVariant(variantId)
				.then((response) => {
					setVariants((prevState) => {
						const newVariants = prevState.filter((variant) => {
							return variant._id !== variantId;
						});
						return newVariants;
					});
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	const findByName = () => {
		if (search === '') {
			retrieveVariants();
		} else {
			VariantDataService.find(search)
				.then((response) => {
					console.log(response.data);
					setVariants(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		}
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

	const handleCloseSnackbarDel = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnackbarDel(false);
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
											<MenuItem value="" onClick={retrieveVariants}>
												<em>None</em>
											</MenuItem>
											<MenuItem value={1} onClick={retrieveVariantsAZ}>
												A-Z
											</MenuItem>
											<MenuItem value={2} onClick={retrieveVariantsZA}>
												Z-A
											</MenuItem>
										</Select>
									</FormControl>
								</span>
								<span
									className={classes.span}
									style={{ position: 'absolute', bottom: 0, width: '100%' }}
								>
									<AddNewVariant edit={false} variants={variants} />
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
									<MenuItem value="" onClick={retrieveVariants}>
										<em>None</em>
									</MenuItem>
									<MenuItem value={1} onClick={retrieveVariantsAZ}>
										A-Z
									</MenuItem>
									<MenuItem value={2} onClick={retrieveVariantsZA}>
										Z-A
									</MenuItem>
								</Select>
							</FormControl>
						</span>
						<span className={classes.span}>
							<AddNewVariant edit={false} variants={variants} />
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
			{variants.length ? (
				<Grid container spacing={4} className={classes.gridContainer}>
					{variants.map((variant, index) => {
						return (
							<Grid item key={index} xs={12} sm={12} md={6}>
								<Card className={classes.variantCard}>
									<Grid container spacing={0}>
										<Grid item xs={5} sm={5} md={5}>
											<div
												style={{
													paddingTop: 16,
													paddingBottom: 16,
													paddingLeft: 16,
												}}
											>
												<CardMedia
													component="img"
													alt="Dorayaki"
													image={variant.gambar}
													title="Dorayaki"
													style={{
														borderRadius: 18,
														border: '3px solid rgba(0, 97, 134, .25)',
														objectFit: 'cover',
														width: '100%',
														height: '100%',
													}}
												/>
											</div>
										</Grid>
										<Grid item xs={7} sm={7} md={7}>
											<div style={{ height: '100%', position: 'relative' }}>
												<CardContent>
													<Typography
														variant="h6"
														className={classes.subtitle2}
													>
														{variant.rasa}
													</Typography>
													<Typography className={classes.description}>
														{variant.deskripsi}
													</Typography>
												</CardContent>
												<CardActions className={classes.variantCardBottom}>
													<span
														style={{
															position: 'absolute',
															right: 0,
															bottom: 0,
															display: 'flex',
															paddingRight: 16,
															paddingBottom: 16,
														}}
													>
														<AddNewVariant
															edit={true}
															variant={variant}
															variants={variants}
														/>
														<Tooltip title="Delete">
															<IconButton
																aria-label="Delete"
																className={classes.deleteButton}
																onClick={() =>
																	deleteVariant(variant._id, index)
																}
															>
																<Delete fontSize="small" />
															</IconButton>
														</Tooltip>
													</span>
												</CardActions>
											</div>
										</Grid>
									</Grid>
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
					There are no variants here
				</Typography>
			)}
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={openSnackbarDel}
				autoHideDuration={6000}
				onClose={handleCloseSnackbarDel}
			>
				<Alert
					onClose={handleCloseSnackbarDel}
					severity="info"
					style={{ backgroundColor: '#0090c7', fontWeight: 500 }}
				>
					Cannot delete! There are still stores that have this variant.
				</Alert>
			</Snackbar>
		</div>
	);
};

export default VariantList;
