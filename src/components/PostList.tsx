import styled from 'styled-components'
import { Post } from './Post'

const Container = styled.div`
display: grid;
grid-template-rows: repeat(auto-fill, 1fr);
grid-gap: 20px;
`

export const PostList = () => {
    return (
        <Container>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </Container>
    )
}