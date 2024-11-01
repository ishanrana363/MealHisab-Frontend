import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../pages/login-form-page/LoginFormPage";
import RegistrationFormPage from "../pages/registration-form-page/RegistrationFormPage";
import Layout from "../layout/Layout";
import BorderCreateFormPage from "../pages/border-page/BorderCreateFormPage";
import AllBorderListPage from "../pages/border-page/AllBorderListPage";


export const router = createBrowserRouter([
    {
        path : "/",
        element : <LoginFormPage></LoginFormPage>
    },
    {
        path : "/registration",
        element : <RegistrationFormPage></RegistrationFormPage>
    },
    {
        path:"/dashboard",
        element : <Layout></Layout>,
        children : [
            {
                path: "border-create",
                element : <BorderCreateFormPage></BorderCreateFormPage>
            },
            {
                path : "all-border",
                element : <AllBorderListPage></AllBorderListPage>
            }
        ]
    }
])