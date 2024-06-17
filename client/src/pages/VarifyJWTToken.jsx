import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VarifyJWTToken() {
    const navigate = useNavigate();

    useEffect(() => {
        const varifyToken = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("/api/auth/varify-JWT-Token", {
                    headers: {
                        Authorization: token,
                    }
                });
                const data = await response.json();
                console.log(data.user);
                navigate("/");
            } catch (error) {
                console.error(error);
                navigate("/sign-in");
            }
        }
        varifyToken();
    }, []);

    return (
        <div>VarifyJWTToken</div>
    )
}