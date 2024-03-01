import { Outlet } from "react-router-dom";
import { Login } from "../Login";
import { useState, useEffect } from "react";

const useAuth = () => {

    const [isAuthenticated, setisAuthenticated] = useState(false);

    useEffect(() => {

        if (sessionStorage.getItem("id") !== null) {
            setisAuthenticated(true);
        }

    }, [])

    return isAuthenticated;
}

export const ProtectedRoutes = () => {

    const auth = useAuth();

    return auth === true ? <Outlet/> : <Login/>
}