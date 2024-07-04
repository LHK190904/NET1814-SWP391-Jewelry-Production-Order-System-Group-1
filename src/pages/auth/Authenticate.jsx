import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken, setToken } from "../../services/authService";
import { Box, CircularProgress, Typography, TextField, Button, FormControlLabel, Checkbox } from "@mui/material";

export default function Authenticate() {
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [doNotShowAgain, setDoNotShowAgain] = useState(false);

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
                    noPassword: data.result.noPassword,
                };
                localStorage.setItem("user", JSON.stringify(userData));

                setCurrentUser(userData);
                setIsLoggedin(true);
            } else {
                console.error("Failed to get user details:", data);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

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

    useEffect(() => {
        authenticateUser();
    }, []);

    const addPassword = async (event) => {
        event.preventDefault();

        const body = {
            password: newPassword,
        };

        try {
            const response = await fetch("http://localhost:8080/cust/create-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (data.code !== 1000) throw new Error(data.message);

            setToken(data.result?.token);
            setCurrentUser(data.result);
            if (doNotShowAgain) {
                localStorage.setItem("skipPasswordCreation", "true");
            }
            navigate("/");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleSkip = () => {
        if (doNotShowAgain) {
            localStorage.setItem("skipPasswordCreation", "true");
        }
        navigate("/");
    };

    useEffect(() => {
        const skipPasswordCreation = localStorage.getItem("skipPasswordCreation") === "true";
        if (skipPasswordCreation) {
            navigate("/");
        } else if (isLoggedin) {
            if (currentUser?.noPassword) {
                setCurrentUser(currentUser);
            } else {
                navigate("/");
            }
        }
    }, [isLoggedin, navigate, currentUser]);

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
            {!currentUser?.noPassword ? (
                <>
                    <CircularProgress />
                    <Typography>Authenticating...</Typography>
                </>
            ) : (
                <Box sx={{ width: '300px' }}>
                    <Typography variant="h5">Create Password</Typography>
                    <form onSubmit={addPassword}>
                        <TextField
                            label="New Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <FormControlLabel
                            control={<Checkbox checked={doNotShowAgain} onChange={(e) => setDoNotShowAgain(e.target.checked)} />}
                            label="Don't show this again"
                        />
                        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Create Password
                        </Button>
                        <Button onClick={handleSkip} variant="outlined" color="secondary" fullWidth sx={{ mt: 1 }}>
                            Skip
                        </Button>
                    </form>
                </Box>
            )}
        </Box>
    );
}
