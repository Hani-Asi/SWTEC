import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { CoProvider, AppShell } from "@co-design/core";
import type { AppContext, AppProps } from "next/app";
import { Header } from "../component";
import { setContext } from "@apollo/client/link/context";
import nookies from "nookies";
import { User } from "../interface";

const httpLink = createHttpLink({
  uri: "http://localhost:1337/graphql",
});

const authLink = setContext((_, { nextContext, headers }) => {
  const { token } = nookies.get(nextContext);

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
      <Header token={pageProps.token} />
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

MyApp.getInitialProps = async (appCtx: AppContext) => {
  const { token } = nookies.get(appCtx.ctx);

  let me: User | null = null;
  if (token) {
    const QUERY = gql`
      query Me {
        me {
          id
          username
          email
        }
      }
    `;
    const { data } = await client.query<{ me: User }>({
      query: QUERY,
      context: {
        nextContext: appCtx.ctx,
      },
    });
    me = data.me;
  }

  return { pageProps: { token, me } };
};

export default MyApp;
