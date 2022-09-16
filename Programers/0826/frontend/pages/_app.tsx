import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { CoProvider, AppShell } from "@co-design/core";
import type { AppProps } from "next/app";
import { Header } from "../component";
import { setContext } from "@apollo/client/link/context";
import nookies from "nookies";

const httpLink = createHttpLink({
  uri: "http://localhost:1337/graphql",
});

const authLink = setContext((_, { headers }) => {
  const { token } = nookies.get();

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  const header = (
    <AppShell.Header height={70}>
      <Header />
    </AppShell.Header>
  );

  return (
    <ApolloProvider client={client}>
      <CoProvider withNormalizeCSS withGlobalStyles>
        <AppShell fixed header={header}>
          <Component {...pageProps} />
        </AppShell>
      </CoProvider>
    </ApolloProvider>
  );
}

export default MyApp;
