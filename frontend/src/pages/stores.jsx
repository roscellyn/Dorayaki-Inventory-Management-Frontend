import React from 'react';
import { Container, Typography } from '@material-ui/core';
import useStyles from '../styles.js';
import StoreList from '../components/store-list.jsx';

function Stores() {
	const classes = useStyles();
	return (
		<div className={classes.containerProducts}>
			<Container>
				<Typography
					variant="h4"
					align="center"
					className={classes.subtitleBlue}
				>
					Our Stores
				</Typography>
				<StoreList />
			</Container>
		</div>
	);
}

export default Stores;
