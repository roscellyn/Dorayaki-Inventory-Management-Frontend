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
	MenuItem,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from '../styles.js';
import { Add, Close, Edit } from '@material-ui/icons';

const initialValues = {
	variantId: '',
	jumlah: 0,
};

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddVariant(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [values, setValues] = useState(initialValues);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [openSnackbarAdd, setOpenSnackbarAdd] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
		props.onClick();
		if (props.edit) {
			const currentValues = {
				variantId: props.stok.variantId,
				jumlah: props.stok.jumlah,
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
		if (values.variantId !== '') {
			var newVariant = {
				variantId: values.variantId,
				jumlah: values.jumlah,
			};

			setOpen(false);
			setValues(initialValues);
			setOpenSnackbar(true);

			if (props.edit) {
				StoreDataService.updateStoreVariant(props.store._id, newVariant)
					.then((response) => {
						console.log(newVariant);
						console.log(response.data);
					})
					.catch((e) => {
						console.log(e);
					});
			} else {
				StoreDataService.addStoreVariant(props.store._id, newVariant)
					.then((response) => {
						console.log(newVariant);
						console.log(response.data);
					})
					.catch((e) => {
						console.log(e);
					});
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
					startIcon={<Add />} //ganti custom icon
					onClick={handleClickOpen}
				>
					Add Variant
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
					{props.edit ? `Stock's Information` : 'Add New Variant to Store'}
				</DialogTitle>
				<DialogContent>
					<form className={classes.root} noValidate autoComplete="off">
						<Grid container style={{ width: '100%' }}>
							{props.edit ? (
								<></>
							) : (
								<Grid item xs={12} className={classes.formItem}>
									<TextField
										select
										label="Variants"
										variant="outlined"
										size="small"
										name="variantId"
										value={values.variantId}
										onChange={handleInputChange}
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{props.availableVariants.map((variant, index) => {
											return (
												<MenuItem key={index} value={variant._id}>
													{variant.rasa}
												</MenuItem>
											);
										})}
									</TextField>
								</Grid>
							)}

							<Grid item xs={12} className={classes.formItem}>
								<TextField
									label="Jumlah"
									variant="outlined"
									size="small"
									name="jumlah"
									type="number"
									value={values.jumlah >= 0 ? values.jumlah : 0}
									InputProps={{
										inputProps: {
											min: 0,
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
							{props.edit ? 'Update Stock' : 'Add Variant'}
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
					Fill all the informations correctly!
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
