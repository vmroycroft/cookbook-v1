import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Find from './features/Find';
import View from './features/View';
import Add from './features/Add';

function App() {
	const client = new ApolloClient({
		uri: process.env.REACT_APP_SERVER_URL,
		cache: new InMemoryCache()
	});

	return (
		<ApolloProvider client={client}>
			<div className="p-2 h-screen gap-2 grid grid-cols-1 lg:grid-cols-3">
				<Find />
				<View />
				<Add />
			</div>
		</ApolloProvider>
	);
}

export default App;
