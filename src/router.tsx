import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainView from "./views/MainView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import CreateCollectionView from "./views/collections/CreateCollectionView";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { AuthProvider } from "@/context/AuthContext";
import DynamicLayout from "./layouts/DynamicLayout";
import { ThemeProvider } from "./context/ThemeContext";
import AllCollectionsView from "./views/collections/AllCollectionsView";
import CollectionDetailsView from "./views/collections/CollectionDetailsView";
import { NotFound } from "./views/404/NotFound";

export default function Router() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider>
                    <Routes>
                        <Route element={<AuthLayout />}>
                            <Route path="/auth/login" element={<LoginView />} />
                            <Route path="/auth/register" element={<RegisterView />} />
                        </Route>

                        {/* Shared routes between auth and not-auth users */}
                        <Route element={<DynamicLayout />}>
                            <Route path="/" element={<MainView />} index />
                            <Route path="/collections" element={<AllCollectionsView />} />
                            <Route path="/collections/:collectionId" element={<CollectionDetailsView />} />
                        </Route>

                        <Route element={<ProtectedLayout />}>
                            <Route path="/collections/create" element={<CreateCollectionView />} />
                        </Route>

                        <Route element={<DynamicLayout />}>
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}