import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./Components";
import "./App.css";
import SignIn from "./Pages/SignIn";
import CustomCards from "./Pages/CustomCards";
import Users from "./Pages/Users";
import SubCategories from "./Pages/SubCategories";
import Mails from "./Pages/Mails";
import {
  setMode,
  setColor,
  setThemeSettings,
  setActiveMenu,
} from "./features/theme/themeSlice";
import { useSelector, useDispatch } from "react-redux";
import SubProductListing from "./Pages/SubProductListing";
import Newsletters from "./Pages/Newsletters";
import ChatScreen from "./Components/ChatScreen";
import EditMotors from "./Pages/Motors/EditMotors";
import AddMotors from "./Pages/Motors/AddMotors";
import Categories from "./Pages/Categories";
import Products from "./Pages/Products";
import AddJobs from "./Pages/Jobs/AddJobProfiles";
import AddFurnitureHomeGarden from "./Pages/FurnitureHomeGarden/AddFurnitureHomeGarden";

const App = () => {
  const dispatch = useDispatch();
  const { currentMode, currentColor, activeMenu, themeSettings } = useSelector(
    (state) => state.theme
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");

    if (currentThemeColor) dispatch(setColor(currentThemeColor));
    if (currentThemeMode) dispatch(setMode(currentThemeMode));
  }, []);

  const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {isAuthenticated && (
            <>
              <div
                className="fixed right-4 bottom-4"
                style={{ zIndex: "1000" }}
              >
                <div content="Settings" position="Top">
                  <button
                    type="button"
                    onClick={() => dispatch(setThemeSettings(true))}
                    style={{ background: currentColor, borderRadius: "50%" }}
                    className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  >
                    <FiSettings />
                  </button>
                </div>
              </div>
              <ChatScreen />
            </>
          )}
          {isAuthenticated && activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : isAuthenticated ? (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          ) : null}

          <div
            className={
              isAuthenticated && activeMenu
                ? "dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full"
                : "bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2"
            }
          >
            {isAuthenticated && (
              <div className="bg-main-bg dark:bg-main-dark-bg navbar w-full">
                <Navbar />
              </div>
            )}

            <div>
              {themeSettings && <ThemeSettings />}

              <Routes>
                <Route path="/signin" element={<SignIn />} />

                <Route
                  path="/"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/analytics" />
                    ) : (
                      <Navigate to="/signin" />
                    )
                  }
                />

                <Route
                  path="/analytics"
                  element={
                    <PrivateRoute>
                      <CustomCards />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <PrivateRoute>
                      <Users />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/categories"
                  element={
                    <PrivateRoute>
                      <Categories />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/subCategories/:id"
                  element={
                    <PrivateRoute>
                      <SubCategories />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <PrivateRoute>
                      <Products />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/products/:id"
                  element={
                    <PrivateRoute>
                      <SubProductListing />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/mails"
                  element={
                    <PrivateRoute>
                      <Mails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/newsletters"
                  element={
                    <PrivateRoute>
                      <Newsletters />
                    </PrivateRoute>
                  }
                />
                <Route path="/edit-motor/:id" element={<EditMotors />} />
                <Route path="/add-motors" element={<AddMotors />} />
                <Route path="/edit-motor/:id" element={<EditMotors />} />
                <Route path="/add-job-profiles" element={<AddJobs />} />
                <Route
                  path="/add-furniture-home-garden"
                  element={<AddFurnitureHomeGarden />}
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
