import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Find from './sections/Find';
import View from './sections/View';
import Add from './sections/Add';

function App() {
	const client = new ApolloClient({
		uri: process.env.REACT_APP_SERVER_URL,
		cache: new InMemoryCache()
	});

	return (
		<ApolloProvider client={client}>
			<div className="grid grid-cols-1 lg:grid-cols-3">
				<Find />
				<View />
				<Add />
			</div>
		</ApolloProvider>
	);
}

export default App;
