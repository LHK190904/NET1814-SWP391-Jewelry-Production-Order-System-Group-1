import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setToken } from "../../services/authService";
import { Box, CircularProgress, Typography } from "@mui/material";
import authService from "../../services/authService";

export default function Authenticate() {
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false);

    const getUserDetails = async (accessToken) => {
        try {
            const response = await fetch("http://localhost:8080/cust/myInfo", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const data = await response.json();

            console.log(data.result);

            if (data.result) {
                // Lưu thông tin người dùng vào localStorage
                const userData = {
                    username: data.result.userName,
                    token: accessToken,
                    title: data.result.title,
                    id: data.result.id,
                };
                localStorage.setItem("user", JSON.stringify(userData));

                setIsLoggedin(true);
            } else {
                console.error("Failed to get user details:", data);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    useEffect(() => {
        const authenticateUser = async () => {
            console.log(window.location.href);

            const authCodeRegex = /code=([^&]+)/;
            const isMatch = window.location.href.match(authCodeRegex);

            if (isMatch) {
                const authCode = isMatch[1];

                try {
                    const response = await fetch(
                        `http://localhost:8080/auth/outbound/authentication?code=${authCode}`,
                        {
                            method: "POST",
                        }
                    );
                    const data = await response.json();
                    console.log(data);
                    setToken(data.result.token);
                    await getUserDetails(data.result.token);
                } catch (error) {
                    console.error("Error during authentication:", error);
                }
            }
        };

        authenticateUser();
    }, []);

    useEffect(() => {
        if (isLoggedin) {
            navigate("/");
        }
    }, [isLoggedin, navigate]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <CircularProgress />
            <Typography>Authenticating...</Typography>
        </Box>
    );
}
