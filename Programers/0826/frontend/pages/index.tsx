import { gql, useQuery } from "@apollo/client";
import {
  Card,
  Heading,
  Text,
  Divider,
  EquallyGrid,
  Spinner,
  Center,
  Container,
  Anchor,
  Stack,
  View,
  Button,
} from "@co-design/core";
import NextLink from "next/link";
import { NextLinkComposed } from "../component";

const GET_POSTS = gql`
  query GetPosts {
    posts(sort: ["createdAt:desc"]) {
      data {
        id
        attributes {
          title
          body
          createdAt
          user {
            data {
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`;

interface Props {
  token?: string;
}

const Home = ({ token }: Props) => {
  const { data, loading, error } = useQuery(GET_POSTS);

  return (
    <Container padding={16} co={{ marginTop: 16 }}>
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Stack>
          {token && (
            <View co={{ textAlign: "right" }}>
              <Button component={NextLinkComposed} href="/posts/create">
                Post
              </Button>
            </View>
          )}
          <EquallyGrid cols={4}>
            {data.posts.data.map((post: any) => (
              <Card key={post.id}>
                <NextLink href="/posts/[id]" as={`/posts/${post.id}`} passHref>
                  <Anchor co={{ textDecoration: "none", color: "black" }}>
                    <Heading level={4}>{post.attributes.title}</Heading>
                  </Anchor>
                </NextLink>
                <Text lineClamp={3}>{post.attributes.body}</Text>
                <Divider />
                <Text block align="right">
                  {post.attributes.user.data.attributes.username}
                </Text>
              </Card>
            ))}
          </EquallyGrid>
        </Stack>
      )}
    </Container>
  );
};

export default Home;
