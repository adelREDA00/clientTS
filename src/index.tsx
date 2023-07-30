import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { persistor, store } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// STYLE
import "./styles/index.scss";
import "./index.css";
import "./fonts/line-awesome-1.3.0/css/line-awesome.css";
import  {AuthContextProvider} from "./context/auth"
import  {PostContextProvider} from "./context/post"

//
const RtlImportCssLazy = React.lazy(() => import("RtlImportCss"));
//

document
  .getElementsByTagName("html")[0]
  .setAttribute("dir", import.meta.env.VITE_LRT_OR_RTL);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <AuthContextProvider>
    <PostContextProvider>
      <App />
      </PostContextProvider>
      </AuthContextProvider>

      {/* LOAD RTL CSS WHEN RTL MODE ENABLE */}
      {import.meta.env.VITE_LRT_OR_RTL === "rtl" && (
        <Suspense fallback={<div />}>
          <RtlImportCssLazy />
        </Suspense>
      )}
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
