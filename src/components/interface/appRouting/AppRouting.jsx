import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from 'src/components/others/spinner/Spinner';

const Page404 = lazy(() => import('pages/404Page/Page404'));
const MainPage = lazy(() => import('pages/mainPage/MainPage'));
const ComicsPage = lazy(() => import('pages/comicsPage/ComicsPage'));
const SingleComicPage = lazy(() => import('pages/singleComicPage/SingleComicPage'));

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
                                path="/comics/:comicId"
                                element={<SingleComicPage />}
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