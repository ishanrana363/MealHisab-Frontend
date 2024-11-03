import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../pages/login-form-page/LoginFormPage";
import RegistrationFormPage from "../pages/registration-form-page/RegistrationFormPage";
import Layout from "../layout/Layout";
import BorderCreateFormPage from "../pages/border-page/BorderCreateFormPage";
import AllBorderListPage from './../pages/border-page/AllBorderListPage';
import BorderUpdateFormPage from './../pages/border-page/BorderUpdateFormPage';
import BorderDetailsPage from './../pages/border-page/BorderDetailsPage';
import RiceEntryFromPage from "../pages/rice-page/rice-entry-page/RiceEntryFromPage";
import RiceCalculationFormPage from '../pages/rice-page/rice-entry-page/RiceCalculationFormPage';
import DailyRiceEntryFormPage from './../pages/rice-page/daily-rice-entry/DailyRiceEntryFormPage';
import DailyRiceCalculationPage from './../pages/rice-page/daily-rice-entry/DailyRiceCalculationPage';
import VegetableEntryFormPage from './../pages/vegetable/VegetableEntryFormPage';
import TotalMillCalculationPage from './../pages/vegetable/TotalMillCalculationPage';
import InsertBazarFormPage from "../pages/bazar-page/InsertBazarFormPage";
import TotalCalculationBazarForm from "../pages/bazar-page/TotalCalculationBazarForm";
import BazarListPage from "../pages/bazar-page/BazarListPage";
import EntryMoneyFormPage from './../pages/money-page/EntryMoneyFormPage';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginFormPage></LoginFormPage>
    },
    {
        path: "/registration",
        element: <RegistrationFormPage></RegistrationFormPage>
    },
    {
        path: "/dashboard",
        element: <Layout></Layout>,
        children: [
            {
                path: "border-create",
                element: <BorderCreateFormPage></BorderCreateFormPage>
            },
            {
                path: "all-border",
                element: <AllBorderListPage></AllBorderListPage>
            },
            {
                path: "border-update/:id",
                element: <BorderUpdateFormPage></BorderUpdateFormPage>
            },
            {
                path : "border-details/:id",
                element : <BorderDetailsPage></BorderDetailsPage>
            },
            {
                path : "rice-entry",
                element : <RiceEntryFromPage></RiceEntryFromPage>
            },
            {
                path : "rice-calculation",
                element : <RiceCalculationFormPage></RiceCalculationFormPage>
            },
            {
                path : "daily-rice-entry-form",
                element : <DailyRiceEntryFormPage></DailyRiceEntryFormPage>
            },
            {
                path : "daily-rice-calculation",
                element : <DailyRiceCalculationPage></DailyRiceCalculationPage>
            },
            {
                path : "vegetable-entry",
                element : <VegetableEntryFormPage></VegetableEntryFormPage>
            },
            {
                path:"mill-calculaton",
                element:<TotalMillCalculationPage></TotalMillCalculationPage>
            },
            {
                path : "bazar-insert",
                element : <InsertBazarFormPage></InsertBazarFormPage>,
            },
            {
                path : "calculation-bazar-border",
                element : <TotalCalculationBazarForm></TotalCalculationBazarForm>
            },
            {
                path : "calculation-bazar",
                element : <BazarListPage></BazarListPage>,
            },
            {
                path : "entry-money",
                element : <EntryMoneyFormPage></EntryMoneyFormPage>
            }
        ]
    }
])