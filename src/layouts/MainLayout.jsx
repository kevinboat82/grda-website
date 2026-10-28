import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { isPinkOctober } from '../utils/pinkOctober';
import '../components/PinkOctober.css';

const MainLayout = () => {
    return (
        <div
            className={isPinkOctober() ? 'pink-october' : undefined}
            style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
        >
            <Navbar />
            <main style={{ flex: 1, paddingTop: '80px' }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
