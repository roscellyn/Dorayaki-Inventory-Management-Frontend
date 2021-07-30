import React, { useState, useEffect } from 'react';
import StoreDataService from '../services/store.jsx';

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Grid,
	IconButton,
	Snackbar,
	MenuItem,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from '../styles.js';
import { Close } from '@material-ui/icons';

const initialValues = {
	storeId: '',
	destinationId: '',
	variantId: '',
	jumlah: 0,
};

const initialStoreState = {
	nama: '',
	jalan: '',
	kecamatan: '',
	provinsi: '',
	noTelp: '',
	stok: [],
};

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MoveStock(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [values, setValues] = useState(initialValues);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [openSnackbarStok, setOpenSnackbarStok] = useState(false);
	const [stores, setStores] = useState([]);
	const [destStore, setDestStore] = useState(initialStoreState);

	useEffect(() => {
		retrieveStores();
	}, []);

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

	const handleClickOpen = () => {
		setOpen(true);
		const currentValues = {
			storeId: props.store._id,
			destinationId: '',
			variantId: props.stok.variantId,
			jumlah: props.stok.jumlah,
		};
		setValues(currentValues);
	};

	const handleClose = () => {
		setOpen(false);
		setValues(initialValues);
	};

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnackbar(false);
	};

	const handleCloseSnackbarStok = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnackbarStok(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
		if (name == 'destinationId') {
			getDestinationStore(value);
		}
	};

	const getDestinationStore = (id) => {
		console.log(id);
		StoreDataService.get(id)
			.then((response) => {
				setDestStore(response.data);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const saveStore = () => {
		if (
			values.storeId !== '' &&
			values.destinationId !== '' &&
			values.variantId !== '' &&
			values.jumlah > 0
		) {
			var destinationStore = destStore;
			var destinationVariant = '';

			destinationStore.stok.forEach((stok) => {
				if (stok.variantId == values.variantId) {
					destinationVariant = stok;
				}
			});

			if (destinationVariant == '') {
				var newDestinationVariant = {
					variantId: values.variantId,
					jumlah: parseInt(values.jumlah),
				};
				StoreDataService.addStoreVariant(
					values.destinationId,
					newDestinationVariant
				)
					.then((response) => {
						console.log(response.data);
					})
					.catch((e) => {
						console.log(e);
					});
			} else {
				var total =
					parseInt(destinationVariant.jumlah) + parseInt(values.jumlah);
				var newDestinationVariant = {
					variantId: values.variantId,
					jumlah: total,
				};
				StoreDataService.updateStoreVariant(
					values.destinationId,
					newDestinationVariant
				)
					.then((response) => {
						console.log(response.data);
					})
					.catch((e) => {
						console.log(e);
					});
			}

			var newVariant = {
				variantId: values.variantId,
				jumlah: props.stok.jumlah - values.jumlah,
			};

			StoreDataService.updateStoreVariant(values.storeId, newVariant)
				.then((response) => {
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});

			setOpen(false);
			setValues(initialValues);
			setOpenSnackbar(true);
		} else {
			setOpenSnackbarStok(true);
		}
	};

	return (
		<div>
			<Button
				className={classes.stockButton}
				variant="contained"
				disableElevation
				onClick={handleClickOpen}
			>
				Move Stock
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="add-dialog-title"
			>
				<div style={{ margin: '5%', marginBottom: 0, position: 'relative' }}>
					<IconButton
						className={classes.searchIcon}
						aria-label="close"
						onClick={handleClose}
						style={{ position: 'absolute', right: 0 }}
					>
						<Close fontSize="small" />
					</IconButton>
				</div>
				<DialogTitle id="add-dialog-title" className={classes.dialogTitle}>
					Stock's Information
				</DialogTitle>
				<DialogContent>
					<form className={classes.root} noValidate autoComplete="off">
						<Grid container style={{ width: '100%' }}>
							<Grid item xs={12} className={classes.formItem}>
								<TextField
									select
									label="Move to"
									variant="outlined"
									size="small"
									name="destinationId"
									value={values.destinationId}
									onChange={handleInputChange}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{stores.map((store, index) => {
										if (store._id == props.store._id) {
											return;
										} else {
											return (
												<MenuItem key={index} value={store._id}>
													{store.nama}
												</MenuItem>
											);
										}
									})}
								</TextField>
							</Grid>
							<Grid item xs={12} className={classes.formItem}>
								<TextField
									label="Jumlah"
									variant="outlined"
									size="small"
									name="jumlah"
									type="number"
									value={
										values.jumlah < 1 || values.jumlah > props.stok.jumlah
											? 1
											: values.jumlah
									}
									InputProps={{
										inputProps: {
											min: 1,
										},
									}}
									onChange={handleInputChange}
									style={{ width: '30%' }}
								/>
							</Grid>
						</Grid>
					</form>
				</DialogContent>
				<DialogActions>
					<div style={{ margin: 'auto', marginBottom: '8%' }}>
						<Button
							variant="contained"
							onClick={saveStore}
							className={classes.addProductButton}
						>
							Move Stock
						</Button>
					</div>
				</DialogActions>
			</Dialog>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={openSnackbarStok}
				autoHideDuration={6000}
				onClose={handleCloseSnackbarStok}
			>
				<Alert
					onClose={handleCloseSnackbarStok}
					severity="info"
					style={{ backgroundColor: '#0090c7', fontWeight: 500 }}
				>
					Cannot move stocks!
				</Alert>
			</Snackbar>
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
}
