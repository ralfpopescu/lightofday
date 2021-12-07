import styled from "styled-components";

const Container = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: hidden;
  max-width: 200px;
`;

export const Line = () => <Container>{"-".repeat(100)}</Container>;
