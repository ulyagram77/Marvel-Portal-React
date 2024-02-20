import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from 'src/components/others/spinner/Spinner';

const Page404 = lazy(() => import('pages/404Page/Page404'));
const MainPage = lazy(() => import('pages/mainPage/MainPage'));
const ComicsPage = lazy(() => import('pages/comicsPage/ComicsPage'));
const SingleCharacterLayout = lazy(
    () => import('interface/singleCharacterLayout/SingleCharacterLayout'),
);
const SingleComicLayout = lazy(
    () => import('interface/singleComicLayout/SingleComicLayout'),
);
const SinglePage = lazy(() => import('pages/singlePage/SinglePage'));

const AppRouting = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/comics" element={<ComicsPage />} />
                            <Route
                                path="/comics/:id"
                                element={
                                    <SinglePage
                                        Component={SingleComicLayout}
                                        dataType="comic"
                                    />
                                }
                            />
                            <Route
                                path="/characters/:id"
                                element={
                                    <SinglePage
                                        Component={SingleCharacterLayout}
                                        dataType="character"
                                    />
                                }
                            />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
};

export default AppRouting;
