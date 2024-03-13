import { Params, useLoaderData, useParams } from "react-router-dom"
import { AlbumPageCardStyle, ResultWrapper } from "../styledComponents"
import { Album, Photo, PhotoWithUserID } from "../types"
import { Card } from "react-bootstrap"
import { FavoriteSvg } from "../components/FavoriteSvg"
import useMyStore from "../stores/FavoriteStore"


export async function getAlbums({params}:{params:Params}){ 
    const albumReponse = await fetch("https://jsonplaceholder.typicode.com/albums/"+params.albumId)
    const photoReponse = await fetch("https://jsonplaceholder.typicode.com/albums/"+params.albumId+"/photos")
    const albumData:Album = await albumReponse.json()
    const photoData:Photo[] = await photoReponse.json()
    return { albumData,photoData}
}

export function AlbumPage()
{
    const allData = useLoaderData() as {albumData:Album,photoData:Photo[]}
    const {userId} = useParams()
    const { setPhotoData } = useMyStore();
    const handleFavoriteClick = (photo:PhotoWithUserID) => {
        setPhotoData(photo)
      };
    return(
        <>
        
        <ResultWrapper>
            <AlbumPageCardStyle>
                <p>{allData.albumData.title}</p>
            </AlbumPageCardStyle>
        </ResultWrapper>
        <ResultWrapper>
           {allData.photoData.map((photo,index)=>(
            <AlbumPageCardStyle key={index}>
                <p>{photo.title}</p>
                <img src={photo.url}></img>
                <Card.Footer>
                <FavoriteSvg addPhoto={() => handleFavoriteClick({userId,...photo})}></FavoriteSvg>
                </Card.Footer>
            </AlbumPageCardStyle>
           ))}
        </ResultWrapper>
        </>
    )
}