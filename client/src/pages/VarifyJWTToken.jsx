import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";

export default function VarifyJWTToken() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const varifyToken = async () => {
            try {
                dispatch(signInStart());
                const token = localStorage.getItem("token");
                const response = await fetch("/api/auth/varify-JWT-Token", {
                    headers: {
                        Authorization: token,
                    }
                });
                const data = await response.json();
                if(response.ok) {
                    console.log(data.user);
                    dispatch(signInSuccess(data.user));
                    navigate("/");
                } else {
                    dispatch(signInFailure(data.message));
                }
            } catch (error) {
                dispatch(signInFailure(error.message));
                navigate("/sign-in");
            }
        }
        varifyToken();
    }, []);

    return (
        <div>VarifyJWTToken</div>
    )
}