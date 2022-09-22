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
  Input,
  Card,
} from "@co-design/core";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { User } from "../../../interface";
import { useLoading } from "@co-design/hooks";

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

const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $body: String!) {
    createComment(data: { post: $postId, body: $body }) {
      data {
        id
        attributes {
          body
        }
      }
    }
  }
`;

const GET_COMMENTS = gql`
  query GetComments($postId: ID!) {
    comments(
      filters: { post: { id: { eq: $postId } } }
      sort: ["createdAt:desc"]
    ) {
      data {
        id
        attributes {
          body
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

const PostDetail = ({ me }: Props) => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { id: router.query.id },
  });
  const {
    data: commentsData,
    loading: commentsLoading,
    error: commentsError,
  } = useQuery(GET_COMMENTS, { variables: { postId: router.query.id } });
  const [deletePost] = useMutation(DELETE_POST);
  const [createComment] = useMutation(CREATE_COMMENT);

  const handleDelete = useCallback(async () => {
    if (confirm("Are you sure delete?")) {
      await deletePost({
        refetchQueries: ["GetPosts"],
        variables: { id: router.query.id },
      });
      router.push("/");
    }
  }, [deletePost, router]);

  const submitCreateComment = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const body = (e.currentTarget.elements as any).body.value;
      (e.currentTarget.elements as any).body.value = "";

      await createComment({
        refetchQueries: ["GetComments"],
        variables: { postId: router.query.id, body },
      });
    },
    [createComment, router]
  );

  const [commentLoading, handleCreateComment] = useLoading(submitCreateComment);

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
          <div>
            <Heading level={3} strong>
              {data.post.data.attributes.title}
            </Heading>
            <Text size="small">
              {data.post.data.attributes.user.data.attributes.username} |&nbsp;
              {data.post.data.attributes.user.data.attributes.email}
            </Text>
          </div>
          <Divider />
          <Text>{data.post.data.attributes.body}</Text>
          <Divider />
          <Stack>
            <Heading level={6}>Reply</Heading>
            <form onSubmit={handleCreateComment}>
              <Group>
                <Input
                  placeholder="Add a comment..."
                  name="body"
                  co={{ flex: 1 }}
                />
                <Button type="submit" loading={commentLoading}>
                  Comment
                </Button>
              </Group>
            </form>
            {commentLoading ? (
              <Spinner />
            ) : (
              commentsData?.comments.data.map((comment: any) => (
                <Card key={comment.id}>
                  <Text block strong size="xsmall">
                    {comment.attributes.user.data.attributes.username}
                  </Text>
                  <Text block size="small">
                    {comment.attributes.body}
                  </Text>
                </Card>
              ))
            )}
          </Stack>
        </Stack>
      )}
    </Container>
  );
};

export default PostDetail;
