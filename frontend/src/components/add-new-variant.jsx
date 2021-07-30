import React, { useState } from 'react';
import VariantDataService from '../services/variant.jsx';
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
	rasa: '',
	deskripsi: '',
	gambar: '',
};

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddNewVariant(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [values, setValues] = useState(initialValues);
	const [openSnackbar, setOpenSnackbar] = React.useState(false);
	const [openSnackbarAdd, setOpenSnackbarAdd] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
		if (props.edit) {
			const currentValues = {
				rasa: props.variant.rasa,
				deskripsi: props.variant.deskripsi,
				gambar: props.variant.gambar,
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

	const saveVariant = () => {
		var sameName = false;
		if (values.rasa !== '' && values.deskripsi !== '' && values.gambar !== '') {
			var newVariant = {
				rasa: values.rasa,
				deskripsi: values.deskripsi,
				gambar: values.gambar,
			};
			props.variants.forEach((variant) => {
				if (values.rasa === variant.rasa) {
					sameName = true;
				}
			});
			if (!sameName) {
				setOpen(false);
				setValues(initialValues);
				setOpenSnackbar(true);

				if (props.edit) {
					VariantDataService.updateVariant(props.variant._id, newVariant)
						.then((response) => {
							console.log(newVariant);
							console.log(response.data);
						})
						.catch((e) => {
							console.log(e);
						});
				} else {
					VariantDataService.createVariant(newVariant)
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
					Add New Variant
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
					Variant's Information
				</DialogTitle>
				<DialogContent>
					<form className={classes.root} noValidate autoComplete="off">
						<Grid container style={{ width: '100%' }}>
							<Grid item xs={12} className={classes.formItem}>
								<TextField
									label="Rasa"
									variant="outlined"
									size="small"
									name="rasa"
									value={values.rasa}
									onChange={handleInputChange}
								/>
							</Grid>
							<Grid item xs={12} className={classes.formItem}>
								<TextField
									label="Deskripsi"
									variant="outlined"
									size="small"
									name="deskripsi"
									value={values.deskripsi}
									onChange={handleInputChange}
								/>
							</Grid>
							<Grid item xs={12} className={classes.formItem}>
								<TextField
									label="URL Gambar"
									variant="outlined"
									size="small"
									name="gambar"
									value={values.gambar}
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
							onClick={saveVariant}
							className={classes.addProductButton}
						>
							{props.edit ? 'Update Variant' : 'Add New Variant'}
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
					Fill all the informations correctly! ("Rasa" must be unique)
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
					Refresh to see the newest variants!
				</Alert>
			</Snackbar>
		</div>
	);
}
