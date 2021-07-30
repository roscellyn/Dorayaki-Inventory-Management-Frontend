import React, { useState, useEffect } from 'react';
import StoreDataService from '../services/store';
import VariantDataService from '../services/variant.jsx';

import useStyles from '../styles.js';
import {
	IconButton,
	Grid,
	Card,
	CardContent,
	CardActions,
	Typography,
	Tooltip,
	Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Delete } from '@material-ui/icons';
import AddVariant from './add-variant.jsx';
import MoveStock from './move-stock.jsx';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StockList = (props) => {
	const classes = useStyles();
	const [variants, setVariants] = useState([]);
	const [availableVariants, setAvailableVariants] = useState([]);
	const [stocks, setStocks] = useState([]);
	const [openSnackbar, setOpenSnackbar] = useState(false);

	useEffect(() => {
		retrieveVariants();
	}, []);

	useEffect(() => {
		retrieveStocks();
	});

	const retrieveVariants = () => {
		retrieveStocks();
		VariantDataService.getAll()
			.then((response) => {
				console.log(response.data);
				setVariants(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const retrieveAvailableVariants = () => {
		let found = false;
		let tempVariants = [];

		variants.forEach((variant) => {
			props.stocks.forEach((stok) => {
				if (variant._id == stok.variantId) {
					found = true;
				}
			});
			if (!found) {
				tempVariants.push(variant);
			}
			found = false;
		});
		setAvailableVariants(tempVariants);
	};

	const retrieveStocks = () => {
		setStocks(props.stocks);
	};

	const deleteStoreVariants = (storeId, stokId) => {
		setOpenSnackbar(true);
		StoreDataService.deleteStoreVariant(storeId, stokId)
			.then((response) => {
				setStocks((prevState) => {
					const newStocks = prevState.filter((stok) => {
						return stok._id != stokId;
					});
					return newStocks;
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnackbar(false);
	};

	return (
		<div>
			<div className={classes.containerTop}>
				<span className={classes.span}>
					<AddVariant
						edit={false}
						store={props.store}
						availableVariants={availableVariants}
						onClick={retrieveAvailableVariants}
					/>
				</span>
			</div>
			<Grid container spacing={4} className={classes.gridContainer}>
				{stocks.length ? (
					stocks.map((stok, index) => {
						let rasa = '';
						let deskripsi = '';
						variants.forEach((variant) => {
							if (stok.variantId === variant._id) {
								rasa = variant.rasa;
								deskripsi = variant.deskripsi;
							}
						});
						return (
							<Grid item key={index} xs={12} sm={6} md={4}>
								<Card className={classes.card}>
									<CardContent className={classes.cardContent}>
										<Typography
											variant="h6"
											gutterBottom
											className={classes.subtitle2}
										>
											{rasa}
										</Typography>
										<Typography className={classes.description}>
											{deskripsi}
										</Typography>
										<br></br>
										{stok.jumlah ? (
											<Typography className={classes.description}>
												<b>Sisa stok: {stok.jumlah}</b>
											</Typography>
										) : (
											<Typography className={classes.description}>
												<b>Stok habis!</b>
											</Typography>
										)}
									</CardContent>
									<CardActions className={classes.storeCardBottom}>
										<MoveStock stok={stok} store={props.store} />
										<span
											style={{
												position: 'absolute',
												right: 0,
												bottom: 0,
												display: 'flex',
												padding: 16,
											}}
										>
											<AddVariant
												edit={true}
												store={props.store}
												stok={stok}
												availableVariants={availableVariants}
												onClick={retrieveAvailableVariants}
											/>
											<Tooltip title="Delete">
												<IconButton
													aria-label="Delete"
													className={classes.deleteButton}
													onClick={() =>
														deleteStoreVariants(props.store._id, stok._id)
													}
												>
													<Delete fontSize="small" />
												</IconButton>
											</Tooltip>
										</span>
									</CardActions>
								</Card>
							</Grid>
						);
					})
				) : (
					<></>
				)}
			</Grid>
			{stocks.length ? (
				<></>
			) : (
				<Typography
					variant="h6"
					style={{ textAlign: 'center', color: '#818181', fontWeight: 400 }}
				>
					Sedang tidak ada stok
				</Typography>
			)}
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity="info"
					style={{ backgroundColor: '#0090c7', fontWeight: 500 }}
				>
					Refresh to see the newest stocks!
				</Alert>
			</Snackbar>
		</div>
	);
};

export default StockList;
