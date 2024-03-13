import { CardProps } from "@mantine/core";
import styled from "styled-components";

export const CardStyle = styled.div<CardProps>`
 width:18rem;
 margin:2rem 0;
 padding:1rem;
 border: 1px solid #000;
 `
export const AlbumPageCardStyle = styled(CardStyle)`
width:100%;
`

export const ResultWrapper = styled.div`
  padding: 50px;
`;
export const NavbarWrapper = styled.div`
display: flex;
justify-content: space-between;
text-align: center;
padding: 1rem 1rem;
`;
export const TabStyle = styled.div`
text-transform: capitalize;
`
 export const HomePageWrapper = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;`

export const FavoriteLink = styled.div`
text-decoration: none;
color:#000;
`