import React from 'react';
import { Box, Typography } from '@material-ui/core';
import useStyles from '../styles';

function Footer() {
	const classes = useStyles();
	return (
		<footer>
			<Box className={classes.footer}>
				<Typography variant="body2" className={classes.footerCopyright}>
					Copyright © 2021 Stand with Dorayaki. All Rights Reserved.
				</Typography>
			</Box>
		</footer>
	);
}

export default Footer;
