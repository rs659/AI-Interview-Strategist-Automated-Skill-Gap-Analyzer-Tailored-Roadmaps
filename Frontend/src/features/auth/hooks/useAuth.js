import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data.user);
            return { success: true };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Invalid email or password"
            };
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            setUser(data.user);
            return { success: true };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Registration failed. Please check your details."
            };
        } finally {
            setLoading(false);
        }
    };

    const handlelogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (err) {
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, handleLogin, handleRegister, handlelogout };
};