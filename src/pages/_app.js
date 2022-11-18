import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LocalStorageContextProvider, { Updater as LocalStorageContextUpdater } from '~/contexts/LocalStorage';
import { useAnalytics } from '~/hooks';
import '~/Theme/globals.css';

function App({ Component, pageProps }) {
	const [queryClient] = React.useState(() => new QueryClient());
	useAnalytics();

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<ChakraProvider>
					<LocalStorageContextProvider>
						<LocalStorageContextUpdater />
						<Component {...pageProps} />
					</LocalStorageContextProvider>
				</ChakraProvider>
			</Hydrate>
		</QueryClientProvider>
	);
}

export default App;
