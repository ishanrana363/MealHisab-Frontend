// src/router/router.jsx
import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../pages/login-form-page/LoginFormPage";
import RegistrationFormPage from "../pages/registration-form-page/RegistrationFormPage";
import Layout from "../layout/Layout";
import UserLayout from "../user-layout/UserLayout";
import ProtectedRoute from "../component/protected-route/ProtectedRoute";
import { getUserRole } from "../utils/getUserRole";

import BorderCreateFormPage from './../pages/border-page/BorderCreateFormPage';
import AllBorderListPage from './../pages/border-page/AllBorderListPage';
import BorderUpdateFormPage from './../pages/border-page/BorderUpdateFormPage';
import BorderDetailsPage from './../pages/border-page/BorderDetailsPage';
import RiceEntryFromPage from './../pages/rice-page/rice-entry-page/RiceEntryFromPage';
import RiceCalculationFormPage from './../pages/rice-page/rice-entry-page/RiceCalculationFormPage';
import DailyRiceEntryFormPage from './../pages/rice-page/daily-rice-entry/DailyRiceEntryFormPage';
import DailyRiceCalculationPage from './../pages/rice-page/daily-rice-entry/DailyRiceCalculationPage';
import VegetableEntryFormPage from './../pages/vegetable/VegetableEntryFormPage';
import TotalMillCalculationPage from './../pages/vegetable/TotalMillCalculationPage';
import InsertBazarFormPage from './../pages/bazar-page/InsertBazarFormPage';
import TotalCalculationBazarForm from './../pages/bazar-page/TotalCalculationBazarForm';
import BazarListPage from './../pages/bazar-page/BazarListPage';
import EntryMoneyFormPage from './../pages/money-page/EntryMoneyFormPage';
import MoneyCalculationFormPage from './../pages/money-page/MoneyCalculationFormPage';
import ThirtyDaysMoneyCalculationFromPage from './../pages/ThirtyDaysCalculationPage/ThirtyDaysMoneyCalculationFromPage';
import ThirtyDaysRiceCalculationPage from './../pages/ThirtyDaysCalculationPage/ThirtyDaysRiceCalculationPage';
import UserProfilePage from './../pages/profile-page/UserProfilePage';
import ProfileUpdate from './../component/profile/ProfileUpdate';
import FormerBorderPage from './../pages/formar-border-page/FormerBorderPage';
import SingleBorderPage from './../pages/formar-border-page/SingleBorderPage';
import UserListPage from './../pages/user-list-page/UserListPage';
import UserStatusUpdate from './../pages/user-list-page/UserStatusUpdate';
import DisableUserListPage from './../pages/user-list-page/DisableUserListPage';
import UserOrders from './../component/UserOrders';
import EmailSendPage from './../pages/forget-password-page/EmailSendPage';
import EmailVerifyPage from './../pages/forget-password-page/EmailVerifyPage';
import ForgetPasswordPage from './../pages/forget-password-page/ForgetPasswordPage';
import ImageGallery from "../component/ImageGallery";
import VideoGallery from "../VideoGallery";


const userRole = getUserRole();

const adminRoutes = [
    { path: "border-create", element: <BorderCreateFormPage /> },
    { path: "all-border", element: <AllBorderListPage /> },
    { path: "border-update/:id", element: <BorderUpdateFormPage /> },
    { path: "border-details/:id", element: <BorderDetailsPage /> },
    { path: "rice-entry", element: <RiceEntryFromPage /> },
    { path: "rice-calculation", element: <RiceCalculationFormPage /> },
    { path: "daily-rice-entry-form", element: <DailyRiceEntryFormPage /> },
    { path: "daily-rice-calculation", element: <DailyRiceCalculationPage /> },
    { path: "vegetable-entry", element: <VegetableEntryFormPage /> },
    { path: "mill-calculaton", element: <TotalMillCalculationPage /> },
    { path: "bazar-insert", element: <InsertBazarFormPage /> },
    { path: "calculation-bazar-border", element: <TotalCalculationBazarForm /> },
    { path: "calculation-bazar", element: <BazarListPage /> },
    { path: "entry-money", element: <EntryMoneyFormPage /> },
    { path: "money-calculations", element: <MoneyCalculationFormPage /> },
    { path: "thiry-days-money-calculation", element: <ThirtyDaysMoneyCalculationFromPage /> },
    { path: "thiry-days-rice-calculation", element: <ThirtyDaysRiceCalculationPage /> },
    { path: "profile", element: <UserProfilePage /> },
    { path: "profile-update", element: <ProfileUpdate /> },
    { path: "former-border-list", element: <FormerBorderPage /> },
    { path: "single/border-details/:id", element: <SingleBorderPage /> },
    { path: "user-list", element: <UserListPage /> },
    { path: "update-status/:id", element: <UserStatusUpdate /> },
    { path: "disable-user-list", element: <DisableUserListPage /> },
];

const userRoutes = [
    {
        path: "order",
        element: <UserOrders />,
    },
];

export const router = createBrowserRouter([
    { path: "/", element: <LoginFormPage /> },
    { path: "/registration", element: <RegistrationFormPage /> },
    { path: "/send-email", element: <EmailSendPage/> },
    { path: "/email-verify", element: <EmailVerifyPage/> },
    { path: "/forget-password", element: <ForgetPasswordPage/> },
    { path: "/img", element: <ImageGallery/> },
    { path: "/video", element: <VideoGallery/> },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                <Layout />
            </ProtectedRoute>
        ),
        children: adminRoutes.map((route) => ({
            ...route,
            element: (
                <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
                    {route.element}
                </ProtectedRoute>
            ),
        })),
    },
    {
        path: "/user-dashboard",
        element: (
            <ProtectedRoute allowedRoles={['user']} userRole={userRole}>
                <UserLayout />
            </ProtectedRoute>
        ),
        children: userRoutes.map((route) => ({
            ...route,
            element: (
                <ProtectedRoute allowedRoles={['user']} userRole={userRole}>
                    {route.element}
                </ProtectedRoute>
            ),
        })),
    },
]);
