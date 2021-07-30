import React from 'react';
import {
	Container,
	Grid,
	Card,
	CardMedia,
	CardContent,
	Typography,
} from '@material-ui/core';
import useStyles from '../styles.js';
import dorayaki from '../../vector/dorayaki-real.jpg';
import pempek from '../../vector/pempek.jpg';
import nasiPadang from '../../vector/nasi-padang.jpg';
import dorayakiTitle from '../../vector/home-title.png';

const cards = [
	{
		id: 1,
		title: 'Nasi Padang',
		description: 'Rasa nasi padang gurih yang bikin kamu jadi ketagihan.',
		image: nasiPadang,
	},
	{
		id: 2,
		title: 'Coklat',
		description: 'Rasa coklat manis yang bisa membuat kamu lebih hepi.',
		image: dorayaki,
	},
	{
		id: 3,
		title: 'Pempek',
		description: 'Rasa pempek dengan protein yang tinggi.',
		image: pempek,
	},
];

function Home() {
	const classes = useStyles();
	return (
		<div className={classes.containerHome}>
			<Container>
				<img src={dorayakiTitle} className={classes.img} alt="dorayaki title" />
			</Container>
			<div className={classes.customShape}>
				<svg
					data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
					className={classes.customShapeSVG}
				>
					<path
						d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
						className={classes.customShapeFill}
					></path>
				</svg>
			</div>
			<div style={{ backgroundColor: '#0090c7', marginBottom: 0 }}>
				<Container className={classes.containerBottom}>
					<Typography variant="h4" align="center" className={classes.subtitle}>
						Featured Dorayaki
					</Typography>
					<Grid container spacing={4} className={classes.gridContainer}>
						{cards.map((card) => (
							<Grid item key={card.id} xs={12} sm={6} md={4}>
								<Card className={classes.cardFeatured}>
									<CardMedia className={classes.cardMedia} image={card.image} />
									<CardContent className={classes.cardContent}>
										<Typography
											variant="h6"
											gutterBottom
											className={classes.subtitle2}
										>
											{card.title}
										</Typography>
										<Typography className={classes.description}>
											{card.description}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</div>
		</div>
	);
}

export default Home;
