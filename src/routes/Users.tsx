import { Card, Text } from "@mantine/core"
import { Link, useLoaderData } from "react-router-dom"
import { User } from "../types";
import { CardStyle, HomePageWrapper } from "../styledComponents";

export async function getAllUsers() {
const response = await fetch("https://jsonplaceholder.typicode.com/users")
const data = await response.json() as User[]
return data;
}
export function Users(){
const data = useLoaderData() as Awaited<ReturnType<typeof getAllUsers>>
return (
    <>
    
        <HomePageWrapper>
        {data.map((user,index)=>(
        <CardStyle key={index} as={Card} shadow="sm" padding="lg" radius="md" >
            <Text fw={500}>{user.name}</Text>
            <Text size="sm" c="dimmed">{user.username}</Text>
            <Text fw={500}>{user.email}</Text>
            <Text fw={500}>{user.address.city}</Text>
            <Text fw={500}>{user.phone}</Text>
            <Text fw={500}>{user.website}</Text>
            <Text fw={500}>{user.company.name}</Text>
            <Link to={"/users/" + user.id}>View Profile</Link>
        </CardStyle> 
        ))}
        </HomePageWrapper>
    </>
    )
}