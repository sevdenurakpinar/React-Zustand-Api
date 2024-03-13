import { Link, Params, useLoaderData } from "react-router-dom"
import { CardStyle, ResultWrapper } from "../styledComponents"
import { Comment, Post, User } from "../types"


export async function getPostComments({params}:{params:Params}){
    const postResponse = await fetch("https://jsonplaceholder.typicode.com/posts/"+ params.userId)
    const commentResponse = await fetch("https://jsonplaceholder.typicode.com/posts/"+ params.postId+"/comments")
    const userResponse = await fetch("https://jsonplaceholder.typicode.com/users/"+ params.userId)
    const postData = await postResponse.json() as Post
    const commentData = await commentResponse.json() as Comment[]
    const userData = await userResponse.json() as User
    return { postData,commentData,userData}
}
export function PostCommentPage()
{
    const allData = useLoaderData() as {postData: Post,commentData: Comment[],userData: User;}
    return(
        <>
        <ResultWrapper>
            <CardStyle>
            <Link to={"/users/"+allData.userData.id}>{allData.userData.username}</Link>
            <p>{allData.postData.title}</p>
            <p>{allData.postData.body}</p>
            </CardStyle>
        </ResultWrapper>
        <ResultWrapper>
            
                {allData.commentData.map((comment,index)=>(
                    <CardStyle key={index}>
                        <p>{comment.name}</p>
                        <p>{comment.body}</p>
                        <p>{comment.email}</p>
                    </CardStyle>
                ))}
            
        </ResultWrapper>
        </>
    )
}