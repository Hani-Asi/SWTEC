import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Stack,
  Heading,
  Group,
  Input,
  Button,
  Spinner,
  Card,
  Text,
} from "@co-design/core";
import { useLoading } from "@co-design/hooks";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { User } from "../../interface";

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

const DELETE_COMMENT = gql`
  mutation DeleteComment($postId: ID!) {
    deleteComment(id: $id) {
      data {
        id
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
              id
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
  me?: User;
}

export const PostComments = ({ me }: Props) => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_COMMENTS, {
    variables: { postId: router.query.id },
  });
  const [createComment] = useMutation(CREATE_COMMENT);
  const [deleteComment] = useMutation(DELETE_COMMENT);

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
  const [submitLoading, handleCreateComment] = useLoading(submitCreateComment);

  const handleDeleteComment = useCallback(
    (commentId: number) => {
      if (confirm("Are you sure delete?")) {
        deleteComment({
          refetchQueries: ["GetComments"],
          variables: { id: commentId },
        });
      }
    },
    [deleteComment]
  );

  return (
    <Stack>
      <Heading level={6}>Reply</Heading>
      <form onSubmit={handleCreateComment}>
        <Group>
          <Input placeholder="Add a comment..." name="body" co={{ flex: 1 }} />
          <Button type="submit" loading={loading}>
            Comment
          </Button>
        </Group>
      </form>
      {submitLoading ? (
        <Spinner />
      ) : (
        data?.comments.data.map((comment: any) => (
          <Card key={comment.id}>
            <Text block strong size="xsmall">
              {comment.attributes.user.data.attributes.username}
            </Text>
            <Text block size="small">
              {comment.attributes.body}
            </Text>
            {me?.id === comment.attributes.user.data.id && (
              <Group spacing={4} position="right">
                <Button
                  color="red"
                  size="xsmall"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Delete
                </Button>
                <Button size="xsmall">Edit</Button>
              </Group>
            )}
          </Card>
        ))
      )}
    </Stack>
  );
};

/*

comment 개수가 1개 이하면 Reply
comment 개수가 2개 이상이면 Repies

{ ? (
  <Heading level={6}>Reply</Heading>
) : (
		<Heading level={6}>Replies</Heading>
}

*/
