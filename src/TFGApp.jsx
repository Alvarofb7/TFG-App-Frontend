import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { MainLayout } from "./layout/MainLayout";

import { AppRouter } from "./router/AppRouter";
import { store } from "./store";

export const TFGApp = () => {
    return (
        <Provider store={ store }>
            <BrowserRouter>
                <MainLayout>
                    <AppRouter />
                </MainLayout>
            </BrowserRouter>
        </Provider>
    )
}
