import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/home.jsx';
import Stores from './pages/stores.jsx';
import Variants from './pages/variants.jsx';
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import Store from './components/store.jsx';

function App() {

	return (
		<>
			<Navbar />
			<main>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/stores" component={Stores} />
					<Route
						exact
						path="/stores/:id"
						render={(props) => <Store {...props} />}
					/>
					<Route exact path="/variants" component={Variants} />
				</Switch>
			</main>
			<Footer />
		</>
	);
}

export default App;
