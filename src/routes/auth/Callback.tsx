import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Callback = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();

    React.useEffect(() => {
        const params = new URLSearchParams(search);
        const code = params.get("code");

        if (code) {
            login("user@example.com", "password");
            navigate("/dashboard");
        }
    }, [search]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-violet-600" />
        </div>
    );
};

export default Callback;
