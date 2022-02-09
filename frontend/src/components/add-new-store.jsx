import React, { useState } from 'react';
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
	Tooltip,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from '../styles.js';
import { Add, Close, Edit } from '@material-ui/icons';

const initialValues = {
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

export default function AddNewStore(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [values, setValues] = useState(initialValues);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [openSnackbarAdd, setOpenSnackbarAdd] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
		if (props.edit) {
			const currentValues = {
				nama: props.store.nama,
				jalan: props.store.jalan,
				kecamatan: props.store.kecamatan,
				provinsi: props.store.provinsi,
				noTelp: props.store.noTelp,
				stok: props.store.stok,
			};
			setValues(currentValues);
		}
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

	const handleCloseSnackbarAdd = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnackbarAdd(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const saveStore = () => {
		var sameName = false;
		if (
			values.nama !== '' &&
			values.jalan !== '' &&
			values.kecamatan !== '' &&
			values.provinsi !== '' &&
			values.noTelp !== ''
		) {
			props.stores.forEach((store) => {
				if (values.nama === store.nama) {
					sameName = true;
				}
			});

			var newStore = {
				nama: values.nama,
				jalan: values.jalan,
				kecamatan: values.kecamatan,
				provinsi: values.provinsi,
				noTelp: values.noTelp,
				stok: values.stok,
			};

			if (props.edit) {
				setOpen(false);
				setValues(initialValues);
				setOpenSnackbar(true);

				StoreDataService.updateStore(props.store._id, newStore)
					.then((response) => {
						console.log(newStore);
						console.log(response.data);
					})
					.catch((e) => {
						console.log(e);
					});
			} else {
				if (!sameName) {
					setOpen(false);
					setValues(initialValues);
					setOpenSnackbar(true);

					StoreDataService.createStore(newStore)
						.then((response) => {
							console.log(newStore);
							console.log(response.data);
						})
						.catch((e) => {
							console.log(e);
						});
				} else {
					setOpenSnackbarAdd(true);
				}
			}
		} else {
			setOpenSnackbarAdd(true);
		}
	};

	return (
		<div>
			{props.edit ? (
				<Tooltip title="Edit">
					<IconButton
						aria-label="Edit"
						className={classes.editButton}
						onClick={handleClickOpen}
					>
						<Edit fontSize="small" />
					</IconButton>
				</Tooltip>
			) : (
				<Button
					className={classes.addButton}
					variant="outlined"
					disableElevation
					startIcon={<Add />}
					onClick={handleClickOpen}
				>
					Add New Store
				</Button>
			)}
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
					Store's Information
				</DialogTitle>
				<DialogContent>
					<form className={classes.root} noValidate autoComplete="off">
						<Grid container style={{ width: '100%' }}>
							<Grid item xs={12} className={classes.formItem}>
								<TextField
									label="Nama"
									variant="outlined"
									size="small"
									name="nama"
									value={values.nama}
									onChange={handleInputChange}
								/>
							</Grid>
							<Grid item xs={12} className={classes.formItem}>
								<TextField
									label="Jalan"
									variant="outlined"
									size="small"
									name="jalan"
									value={values.jalan}
									onChange={handleInputChange}
								/>
							</Grid>
							<Grid item xs={12} className={classes.formItem}>
								<TextField
									label="Kecamatan"
									variant="outlined"
									size="small"
									name="kecamatan"
									value={values.kecamatan}
									onChange={handleInputChange}
								/>
							</Grid>
							<Grid item xs={12} className={classes.formItem}>
								<TextField
									label="Provinsi"
									variant="outlined"
									size="small"
									name="provinsi"
									value={values.provinsi}
									onChange={handleInputChange}
								/>
							</Grid>
							<Grid item xs={12} className={classes.formItem}>
								<TextField
									label="Nomor Telepon"
									variant="outlined"
									size="small"
									name="noTelp"
									value={values.noTelp}
									onChange={handleInputChange}
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
							{props.edit ? 'Update Store' : 'Add New Store'}
						</Button>
					</div>
				</DialogActions>
			</Dialog>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={openSnackbarAdd}
				autoHideDuration={6000}
				onClose={handleCloseSnackbarAdd}
			>
				<Alert
					onClose={handleCloseSnackbarAdd}
					severity="info"
					style={{ backgroundColor: '#0090c7', fontWeight: 500 }}
				>
					Fill all the informations correctly! ("Nama" must be unique)
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
					Refresh to see the newest stores!
				</Alert>
			</Snackbar>
		</div>
	);
}
