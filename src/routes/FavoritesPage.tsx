/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, Text } from "@mantine/core";
import { AlbumPageCardStyle, CardStyle, ResultWrapper } from "../styledComponents";

export function FavoritesPage() {
  const favoriteAlbums: any = JSON.parse(localStorage.getItem("allData-storage")!
  );
  return (
    <>
    {
      favoriteAlbums.state.postData | favoriteAlbums.state.photoData ?
      <Tabs defaultValue="favPost">
      <Tabs.List>
        {
          favoriteAlbums.state.postData &&
          <Tabs.Tab value="favPost">
          Favorilenmiş Postlar
          </Tabs.Tab>
        }
        {
          favoriteAlbums.state.photoData &&
          <Tabs.Tab value="favAlbum">
          Favorilenmiş Albümler
          </Tabs.Tab>
        }
      </Tabs.List>
      {
        favoriteAlbums.state.postData &&
        <Tabs.Panel value="favPost">
      <ResultWrapper>
      {favoriteAlbums.state.postData.map((post: any, index: number) => (
          <CardStyle key={index}>
            <Text fw={"bold"}>{post.title}</Text>
            <Text>{post.body}</Text>
          </CardStyle>
      ))}
    </ResultWrapper>
      </Tabs.Panel>
      }
      {
        favoriteAlbums.state.photoData &&
        <Tabs.Panel value="favAlbum">
      <ResultWrapper>
        {favoriteAlbums.state.photoData.map((photo: any, index: number) => (
          <AlbumPageCardStyle key={index}>
            <Text fw={"bold"}>{photo.title}</Text>
            <img src={photo.url}></img>
          </AlbumPageCardStyle>
        ))}
      </ResultWrapper>
      </Tabs.Panel>
      }
    </Tabs>
    :"Favorilenmiş post yada albüm bulunamadı!"
    }
    </>
  );
}

export default FavoritesPage;
