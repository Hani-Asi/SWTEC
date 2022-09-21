import { useQuery, gql, useMutation } from "@apollo/client";
import { NextLinkComposed } from "../../../component";
import {
  Container,
  Divider,
  Heading,
  Text,
  Spinner,
  Stack,
  Group,
  Button,
} from "@co-design/core";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { User } from "../../../interface";

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      data {
        id
        attributes {
          title
          body
          user {
            data {
              id
              attributes {
                username
                email
              }
            }
          }
        }
      }
    }
  }
`;

interface Props {
  me?: User;
}

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      data {
        id
      }
    }
  }
`;

const PostDetail = ({ me }: Props) => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { id: router.query.id },
  });

  const [deletePost] = useMutation(DELETE_POST);

  const handleDelete = useCallback(async () => {
    if (confirm("Are you sure delete?")) {
      await deletePost({
        refetchQueries: ["GetPosts"],
        variables: { id: router.query.id },
      });
      router.push("/");
    }
  }, [deletePost, router]);

  return (
    <Container size={900} padding={16} co={{ marginTop: 16 }}>
      {loading ? (
        <Spinner />
      ) : (
        <Stack>
          {me?.id === data.post.data.attributes.user.data.id && (
            <Group spacing={8} position="right">
              <Button color="red" onClick={handleDelete}>
                Delete
              </Button>
              <Button
                component={NextLinkComposed}
                href="/posts/[id]/edit"
                as={`/posts/${router.query.id}/edit`}
              >
                Edit
              </Button>
            </Group>
          )}
          <Heading level={3} strong>
            {data.post.data.attributes.title}
          </Heading>
          <Divider />
          <Text>{data.post.data.attributes.body}</Text>
          <Divider />
          <Text size="small">
            {data.post.data.attributes.user.data.attributes.username} |&nbsp;
            {data.post.data.attributes.user.data.attributes.email}
          </Text>
        </Stack>
      )}
    </Container>
  );
};

export default PostDetail;
