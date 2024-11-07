// src/utils/getUserRole.js
export const getUserRole = () => {
    const token = localStorage.getItem('token');
    console.log("Token:", token); // Log the token value
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log("Decoded Payload:", payload); // Log the decoded payload
            console.log(payload.user.role);
            return payload.user.role; // Ensure this path is correct
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    }
    return null;
};