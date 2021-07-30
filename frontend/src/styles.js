import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	appBar: {
		boxShadow: 'none',
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
	},
	title: {
		fontWeight: theme.typography.fontWeightMedium,
		marginLeft: 20,
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.blue.dark,
	},
	nav: {
		marginLeft: 'auto',
	},
	navItem: {
		fontWeight: theme.typography.fontWeightMedium,
		color: theme.palette.grey.main,
		padding: 10,
		marginRight: 10,
		marginLeft: 10,
		display: 'inline',
		textTransform: 'none',
		'&:hover': {
			color: theme.palette.blue.dark,
		},
	},
	navItemActive: {
		fontWeight: theme.typography.fontWeightMedium,
		color: theme.palette.blue.dark,
		padding: 10,
		marginRight: 10,
		marginLeft: 10,
		display: 'inline',
		textTransform: 'none',
	},
	stockButton: {
		fontWeight: theme.typography.fontWeightMedium,
		fontSize: 12,
		backgroundColor: theme.palette.blue.main,
		color: theme.palette.primary.dark,
		textTransform: 'none',
		borderRadius: 6,
		'&:hover': {
			backgroundColor: theme.palette.blue.dark,
		},
	},
	addButton: {
		fontSize: 12,
		color: theme.palette.blue.dark,
		textTransform: 'none',
		borderRadius: 6,
		borderColor: 'rgba(0, 97, 134, 0.4)',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
	editButton: {
		color: theme.palette.blue.dark,
		padding: 6,
	},
	deleteButton: {
		color: theme.palette.blue.dark,
		padding: 6,
	},
	menuButton: {
		color: theme.palette.blue.dark,
		padding: 6,
	},
	addProductButton: {
		fontWeight: theme.typography.fontWeightMedium,
		backgroundColor: theme.palette.blue.main,
		color: theme.palette.primary.dark,
		textTransform: 'none',
		borderRadius: 6,
		padding: '10px 20px',
		boxShadow: 'none',
		'&:hover': {
			backgroundColor: theme.palette.blue.dark,
		},
	},
	containerHome: {
		backgroundColor: theme.palette.primary.main,
		padding: theme.spacing(8, 0, 6),
		paddingBottom: 0,
		minHeight: '100vh',
	},
	containerProducts: {
		backgroundColor: theme.palette.primary.main,
		padding: '130px 6% 60px 6% ',
		minHeight: '100vh',
		[theme.breakpoints.down('sm')]: {
			paddingTop: 100,
		},
	},
	containerTop: {
		position: 'relative',
		display: 'flex',
	},
	containerBottom: {
		padding: '0px 10% 10% 10% ',
		minHeight: '63vh',
	},
	span: {
		display: 'inline-block',
		alignSelf: 'flex-end',
	},
	img: {
		display: 'block',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: '5%',
		width: '68%',
		[theme.breakpoints.down('md')]: {
			width: '80%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},
	customShape: {
		position: 'relative',
		bottom: 0,
		left: 0,
		width: '100%',
		overflow: 'hidden',
		lineHeight: 0,
	},
	customShapeSVG: {
		position: 'relative',
		display: 'block',
		width: 'calc(177% + 1.3px)',
		height: '100%',
	},
	customShapeFill: {
		fill: '#0090C7',
	},
	subtitle: {
		color: theme.palette.primary.dark,
		fontWeight: theme.typography.fontWeightMedium,
		marginBottom: 20,
	},
	subtitle2: {
		fontWeight: theme.typography.fontWeightMedium,
		color: theme.palette.blue.dark,
	},
	subtitleBlue: {
		color: theme.palette.blue.dark,
		fontWeight: theme.typography.fontWeightMedium,
		marginBottom: 20,
	},
	description: {
		color: theme.palette.blue.dark,
		fontSize: 12,
		fontWeight: 400,
	},
	gridContainer: {
		padding: '20px 0px',
	},
	card: {
		backgroundColor: theme.palette.blue.light,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		borderRadius: 18,
		boxShadow: '0 7px 20px -10px rgba(0,0,0,0.2)',
	},
	variantCard: {
		backgroundColor: theme.palette.blue.light,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		borderRadius: 18,
		boxShadow: '0 7px 20px -10px rgba(0,0,0,0.2)',
	},
	cardFeatured: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		borderRadius: 18,
		boxShadow: '0 7px 20px -10px rgba(0,0,0,0.2)',
		transition: 'transform .2s',
		'&:hover': {
			transform: 'scale(1.1)',
		},
	},
	cardMedia: {
		paddingTop: '56.25%',
	},
	cardContent: {
		flexGrow: 1,
	},
	storeCardBottom: {
		position: 'relative',
		padding: 16,
	},
	variantCardBottom: {
		position: 'absolute',
		right: 0,
		bottom: 0,
	},
	formItem: {
		marginBottom: theme.spacing(2),
	},
	formControlSort: {
		margin: theme.spacing(0),
	},
	inputLabelSort: {
		color: theme.palette.blue.dark,
		fontSize: 12,
		fontWeight: theme.typography.fontWeightMedium,
		paddingLeft: '10%',
	},
	selectSort: {
		color: theme.palette.blue.dark,
		fontSize: 12,
		fontWeight: theme.typography.fontWeightMedium,
	},
	search: {
		display: 'flex',
		alignItems: 'center',
		width: 300,
		backgroundColor: '#f3f3f4',
		borderRadius: 6,
		padding: '0.8% 0%',
		'&:hover': {
			backgroundColor: theme.palette.primary.main,
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
		[theme.breakpoints.down('sm')]: {
			width: '117%',
		},
	},
	searchInput: {
		marginLeft: theme.spacing(1),
		flex: 1,
		fontSize: 12,
		color: 'hsl(0, 0%, 13%)',
	},
	searchIcon: {
		color: theme.palette.grey.main,
		padding: 4,
		marginRight: '1%',
	},
	addIcon: {
		color: theme.palette.grey.main,
	},
	dialogTitle: {
		textAlign: 'center',
		color: theme.palette.blue.dark,
		[theme.breakpoints.down('sm')]: {
			marginTop: 15,
		},
	},
	backToStore: {
		color: theme.palette.grey.main,
		display: 'flex',
		alignItems: 'center',
		textTransform: 'none',
		textDecoration: 'none',
		'&:hover': {
			color: theme.palette.blue.dark,
		},
		[theme.breakpoints.down('sm')]: {
			marginBottom: 15,
		},
	},
	footer: {
		backgroundColor: theme.palette.primary.dark,
		padding: '20px 40px',
	},
	footerCopyright: {
		textAlign: 'right',
		color: theme.palette.blue.dark,
	},
	root: {
		'& > *': {
			width: '50ch',
			margin: theme.spacing(1),
		},
		'& .MuiTextField-root': {
			width: '97%',
			[theme.breakpoints.down('sm')]: {
				width: '95%',
			},
		},
		'& .MuiOutlinedInput-root': {
			'&:hover fieldset': {
				borderColor: theme.palette.grey.main,
			},
			'&.Mui-focused fieldset': {
				borderColor: theme.palette.blue.main,
			},
		},
		'& label.Mui-focused': {
			color: theme.palette.blue.main,
		},
	},
}));

export default useStyles;
