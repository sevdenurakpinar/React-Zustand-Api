import { Badge } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import { FavoriteLink, NavbarWrapper } from "../styledComponents";
import useMyStore from "../stores/FavoriteStore";

export default function Root() {
    const count = useMyStore((state)=> state.count)
    return (
      <>
        <NavbarWrapper>{/* 
        <Anchor variant="gradient" gradient={{ from: 'black', to: 'white' }} fw={500} fz="lg" href="/">Anasayfa</Anchor> */}
        <Link to={"/"}>Anasayfa</Link>
      <FavoriteLink as={Link} to={"/favorites"}>
        Favorilerim
        {count != 0 &&
          <Badge color="yellow">{count}</Badge>
        }
      </FavoriteLink>
        </NavbarWrapper>
        <Outlet></Outlet>
      </>
    );
  }