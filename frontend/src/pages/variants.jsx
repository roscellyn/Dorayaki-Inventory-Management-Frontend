import React from 'react';
import { Container, Typography } from '@material-ui/core';
import useStyles from '../styles.js';
import VariantList from '../components/variant-list.jsx';

function Variants() {
	const classes = useStyles();
	return (
		<div className={classes.containerProducts}>
			<Container>
				<Typography
					variant="h4"
					align="center"
					className={classes.subtitleBlue}
				>
					Dorayaki's Variants
				</Typography>
				<VariantList />
			</Container>
		</div>
	);
}

export default Variants;
