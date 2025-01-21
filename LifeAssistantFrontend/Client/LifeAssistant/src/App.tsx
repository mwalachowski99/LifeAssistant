import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import ActivityList from './components/activities/ActivityList'
import { Container } from '@mui/material'
import { useEffect } from 'react'
import { setupErrorHandlingInterceptor } from './interceptors/axiosInterceptor'

function App() {
    const location = useLocation()

    useEffect(() => {
        setupErrorHandlingInterceptor()
    }, [])
    return (
        <>
            {location.pathname === '/' ? (
                <ActivityList />
            ) : (
                <Container className="container-style">
                    <Outlet />
                </Container>
            )}
        </>
    )
}

export default App
