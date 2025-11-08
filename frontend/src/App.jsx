import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AppContainer from "./components/AppContainer";

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  );
}