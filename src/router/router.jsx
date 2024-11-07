// src/router/router.jsx
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
import MoneyCalculationFormPage from "../pages/money-page/MoneyCalculationFormPage";
import ThirtyDaysMoneyCalculationFromPage from "../pages/ThirtyDaysCalculationPage/ThirtyDaysMoneyCalculationFromPage";
import ThirtyDaysRiceCalculationPage from './../pages/ThirtyDaysCalculationPage/ThirtyDaysRiceCalculationPage';
import UserProfilePage from './../pages/profile-page/UserProfilePage';
import UpdateProfilePage from './../pages/profile-page/UpdateProfilePage';
import ProtectedRoute from "../component/protected-route/ProtectedRoute";
import { getUserRole } from "../utils/getUserRole";
import ProfileUpdate from "../component/profile/ProfileUpdate";
import FormerBorderPage from "../pages/formar-border-page/FormerBorderPage";
import SingleBorderPage from "../pages/formar-border-page/SingleBorderPage";
import UserListPage from './../pages/user-list-page/UserListPage';
import UserStatusUpdate from "../pages/user-list-page/UserStatusUpdate";



const userRole = getUserRole(); // Retrieve the user role from localStorage

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginFormPage />
    },
    {
        path: "/registration",
        element: <RegistrationFormPage />
    },
    {
        path: "/dashboard",
        element: <Layout />,
        children: [
            {
                path: "border-create",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <BorderCreateFormPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "all-border",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <AllBorderListPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "border-update/:id",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <BorderUpdateFormPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "border-details/:id",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <BorderDetailsPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "rice-entry",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <RiceEntryFromPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "rice-calculation",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <RiceCalculationFormPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "daily-rice-entry-form",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <DailyRiceEntryFormPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "daily-rice-calculation",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <DailyRiceCalculationPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "vegetable-entry",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <VegetableEntryFormPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "mill-calculaton",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <TotalMillCalculationPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "bazar-insert",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <InsertBazarFormPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "calculation-bazar-border",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <TotalCalculationBazarForm />
                    </ProtectedRoute>
                )
            },
            {
                path: "calculation-bazar",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <BazarListPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "entry-money",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <EntryMoneyFormPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "money-calculations",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <MoneyCalculationFormPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "thiry-days-money-calculation",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <ThirtyDaysMoneyCalculationFromPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "thiry-days-rice-calculation",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <ThirtyDaysRiceCalculationPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <UserProfilePage />
                    </ProtectedRoute>
                )
            },
            {
                path: "profile-update",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <ProfileUpdate />
                    </ProtectedRoute>
                )
            },
            {
                path: "former-border-list",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <FormerBorderPage />
                    </ProtectedRoute>
                )
            },

            {
                path: "single/border-details/:id",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <SingleBorderPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "user-list",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <UserListPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "update-status/:id",
                element: (
                    <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                        <UserStatusUpdate />
                    </ProtectedRoute>
                )
            }
        ]
    }
]);
