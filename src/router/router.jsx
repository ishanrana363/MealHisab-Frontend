import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../pages/login-form-page/LoginFormPage";
import RegistrationFormPage from "../pages/registration-form-page/RegistrationFormPage";


export const router = createBrowserRouter([
    {
        path : "/",
        element : <LoginFormPage></LoginFormPage>
    },
    {
        path : "/registration",
        element : <RegistrationFormPage></RegistrationFormPage>
    }
])