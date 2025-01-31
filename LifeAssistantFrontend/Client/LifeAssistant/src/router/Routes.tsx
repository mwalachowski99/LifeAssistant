import { RouteObject, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import SignIn from '../components/account/SignIn/SignIn'
import PrivateRoute from './PrivateRoute'
import ActivityList from '../components/activities/ActivityList'

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'signIn', element: <SignIn /> },
            {
                path: 'activities',
                element: (
                    <PrivateRoute>
                        <ActivityList />
                    </PrivateRoute>
                ),
            },
        ],
    },
]

export const router = createBrowserRouter(routes)
