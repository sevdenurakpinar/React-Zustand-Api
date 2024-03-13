import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { Users, getAllUsers } from './routes/Users.tsx';
import ErrorPage from './routes/Error.tsx';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { UserPage } from './routes/SingleUser.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Root from './routes/Root.tsx';
import { PostCommentPage, getPostComments } from './routes/PostComment.tsx';
import { AlbumPage, getAlbums } from './routes/AlbumPage.tsx';
import { FavoritesPage } from './routes/FavoritesPage.tsx';
const router = createHashRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        errorElement: <ErrorPage />,
        children:[
          {
            index: true,
            element: <Users/>,
            loader: getAllUsers
          },
          {
            path: "favorites",
            element:<FavoritesPage></FavoritesPage>,
          },
          {
            path: "users/:userId",
            children:[
              {
                index:true,
                element: <UserPage></UserPage>,
              },
              {
                path:"posts/:postId",
                element: <PostCommentPage></PostCommentPage>,
                loader: getPostComments
              },
              {
                path:"albums/:albumId",
                element: <AlbumPage></AlbumPage>,
                loader: getAlbums
              }
            ]
          },]
      }
  ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
)
