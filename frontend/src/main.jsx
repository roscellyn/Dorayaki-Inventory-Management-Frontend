import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#ffffff',
			dark: '#f5f6fa',
		},
		blue: {
			light: '#d8ecf4',
			main: '#0090c7',
			dark: '#006186',
		},
		grey: {
			main: '#818181',
		},
	},
	typography: {
		fontFamily: 'Inter',
		fontWeightRegular: 400,
		fontWeightMedium: 600,
		fontWeightBold: 700,
	},
	button: {
		textTransform: 'none',
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920,
		},
	},
});

ReactDOM.render(
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</BrowserRouter>,
	document.getElementById('root')
);
