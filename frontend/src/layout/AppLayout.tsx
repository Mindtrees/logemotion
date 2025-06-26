import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = React.lazy(() => import('../pages/Home'));
const Write = React.lazy(() => import('../pages/Write'));
const MyPosts = React.lazy(() => import('../pages/MyPosts'));
const AllPosts = React.lazy(() => import('../pages/AllPosts'));
const Login = React.lazy(() => import('../pages/Login'));
const SignUp = React.lazy(() => import('../pages/SignUp'));
const Profile = React.lazy(() => import('../pages/Profile'));

const AppLayout: React.FC = () => {
    return (
        <div>
            <NavBar />
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/write" element={<Write />} />
                        <Route path="/my-posts" element={<MyPosts />} />
                        <Route path="/all-posts" element={<AllPosts />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Routes>
                </Suspense>
            <Footer />
        </div>
    );
};

export default AppLayout;
