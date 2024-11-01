import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../pages/login-form-page/LoginFormPage";


export const router = createBrowserRouter([
    {
        path : "/",
        element : <LoginFormPage></LoginFormPage>
    }
])