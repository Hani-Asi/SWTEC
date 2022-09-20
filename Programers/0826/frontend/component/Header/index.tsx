import { Button, Group, Heading } from "@co-design/core";

interface Props {
  token?: string;
}

export const Header = ({ token }: Props) => {
  return (
    <Group position="apart" align="center" co={{ height: 70, padding: 16 }}>
      <Heading level={4}>AsiLog</Heading>

      {token ? (
        <Button size="small">Logout</Button>
      ) : (
        <Button size="small">Login</Button>
      )}
    </Group>
  );
};
