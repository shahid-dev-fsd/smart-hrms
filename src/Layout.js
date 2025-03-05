import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const subscriptionId = localStorage.getItem("subscriptionId");
    const path = location.pathname;

    // Define paths where the header should be hidden
    const hideHeaderPaths = [
        "/walkover",
        "/checkout",
        "/createOrganization",
        "/listOrganization",
    ]; 

    // Check if current path includes dynamic segments (e.g., /EditOrganization/:id)
    const isEditOrganization = path.startsWith("/EditOrganization");

    // Determine if the header should be hidden based on the current path
    const shouldHideHeader = hideHeaderPaths.includes(path) || isEditOrganization;

    useEffect(() => {
        // If subscriptionId exists and the current path is "/walkover" or "/checkout", navigate to "/listOrganization"
        if (subscriptionId && (path === "/walkover" || path === "/checkout")) {
            navigate("/listOrganization");
        }
    }, [subscriptionId, path, navigate]);

    return (
        <>
            {shouldHideHeader ? (
                // When header is hidden, render the Outlet without Navbar
                <Outlet />
            ) : (
                // When header is not hidden, render the Navbar along with the Outlet
                <Navbar>
                    <Outlet />
                </Navbar>
            )}
        </>
    );
};

export default Layout;
