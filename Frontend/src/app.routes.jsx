import React from 'react';
import { createBrowserRouter } from 'react-router';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Protected from './features/auth/components/protected';
import Home from './features/interview/pages/Home';
import Interview from './features/interview/pages/interview';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import { useAuth } from './features/auth/hooks/useAuth';

const HomeRoute = () => {
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <main style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1>Loading...</h1>
            </main>
        );
    }
    return user ? <Home /> : <Landing />;
};

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <HomeRoute />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/interview/:interviewId',
                element: <Protected><Interview /></Protected>
            }
        ]
    }
]);