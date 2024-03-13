import { Card, Tabs, Text } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { Album, Post, Todo } from "../types";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { CardStyle, TabStyle } from "../styledComponents";
import { FavoriteSvg } from "../components/FavoriteSvg";
import useMyStore from "../stores/FavoriteStore";

const tabs = ["post","album","todo"]

async function getUserData(userId:string,activeTab:string)
    {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/" + userId + "/" + activeTab + "s")
      const data:Post[] | Album[] |Todo[] = await response.json()
      return data
    }
export function UserPage(){
    const [posts,setPosts] = useState<Post[]|Album[]|Todo[]>([]) 
    const [activeTab,setActiveTab] = useState("post")
    const { userId } = useParams();
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
      ( async () => {
        setLoading(true)
        const result = await getUserData(userId as string,activeTab)
        setPosts(result)
        setLoading(false)
      })()
    },[activeTab])
    const { setPostData } = useMyStore();
    const handleFavoriteClick = (post:Post) => {
        setPostData(post)
      };
    return(
      <>
      <Tabs defaultValue={activeTab}>
        <Tabs.List>
        {tabs.map((tab,index)=>(
          <TabStyle as={Tabs.Tab} value={tab} key={index} onClick={()=>setActiveTab(tab)}>
            {tab}
          </TabStyle>
        ))}
        </Tabs.List>
      {loading ? <ClipLoader color="#36d7b7" /> :
      tabs.map((tab)=>(posts.map((post,index)=>(
        <Tabs.Panel value={tab} key={index}>
          <CardStyle as={Card}>
            {
              tab == "post" && <div><Text fw={"bold"}>{post.title}</Text><Text>{(post as Post).body}</Text><FavoriteSvg  addPhoto={() => handleFavoriteClick({...(post as Post)})}></FavoriteSvg></div>
            }
            {
              tab == "album" && <div><Text fw={"bold"}>{post.title}</Text></div>
            }
            {
              tab == "todo" && <div><Text fw={"bold"}>{post.title}</Text></div>
            }
            <Text>{ tab != "todo" && <Link to={`./${tab}s/${post.id}`}>Tıkla</Link>}</Text>
          </CardStyle>
        </Tabs.Panel>
      ))))}
    </Tabs>
      </>
        
    )
}
