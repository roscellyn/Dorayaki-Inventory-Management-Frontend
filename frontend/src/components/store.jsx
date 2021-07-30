import React, { useState, useEffect } from 'react';
import StoreDataService from '../services/store';
import StockList from '../components/stock-list.jsx';
import { Link } from 'react-router-dom';
import { Typography, Container, SvgIcon } from '@material-ui/core';
import useStyles from '../styles.js';

function ArrowBackIcon(props) {
	return (
		<SvgIcon {...props}>
			<path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
		</SvgIcon>
	);
}

const Store = (props) => {
	const classes = useStyles();
	const initialStoreState = {
		nama: '',
		jalan: '',
		kecamatan: '',
		provinsi: '',
		noTelp: '',
		stok: [],
	};

	const [store, setStore] = useState(initialStoreState);
	const [stocks, setStocks] = useState([]);

	const getStore = (id) => {
		console.log(id);
		StoreDataService.get(id)
			.then((response) => {
				setStore(response.data);
				setStocks(response.data.stok);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		getStore(props.match.params.id);
	}, [props.match.params.id]);

	return (
		<div className={classes.containerProducts}>
			<Container>
				<Link className={classes.backToStore} to={'/stores'}>
					<ArrowBackIcon fontSize="small" />
					<Typography variant="body2" style={{ fontWeight: 600 }}>
						Back to Stores
					</Typography>
				</Link>
				<Typography
					variant="h4"
					align="center"
					className={classes.subtitleBlue}
				>
					{store.nama}
				</Typography>
				<StockList stocks={stocks} store={store} />
			</Container>
		</div>
	);
};

export default Store;
