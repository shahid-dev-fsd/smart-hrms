import { CssBaseline } from "@mui/material";
import React, { createContext, useCallback, useContext, useState } from "react";
import AuthorizationProvider from "../hooks/Authorize";
import useSnack from "../hooks/useSnack";
import ThemeContextProvider from "./../style/theme";

const HeaderContext = createContext();

const Header = ({ children }) => {
  const { SnackBar, showMessage } = useSnack();
  const [refreshPage, setRefreshPage] = useState(false);

  const triggerRefresh = () => setRefreshPage((prev) => !prev);

  return (
    <ThemeContextProvider>
      <CssBaseline />
      <HeaderContext.Provider
        value={{ showMessage, refreshPage, triggerRefresh }}
      >
        <AuthorizationProvider>{children}</AuthorizationProvider>
        {SnackBar}
      </HeaderContext.Provider>
    </ThemeContextProvider>
  );
};

const useMessage = () => {
  const showMessage = useContext(HeaderContext)?.showMessage;

  const showSuccess = useCallback(
    function (msg) {
      showMessage({ success: msg });
    },
    [showMessage]
  );

  const showError = useCallback(
    function (msg) {
      Array.isArray(msg)
        ? msg.forEach((msg) => showMessage({ error: msg }))
        : showMessage({ error: msg });
    },
    [showMessage]
  );

  const showResponse = useCallback(
    function (msg, action) {
      showMessage({ response: msg, action });
    },
    [showMessage]
  );

  return { showError, showSuccess, showResponse };
};

const useRefresh = () => useContext(HeaderContext);

// const useEventEmitter = () => {
//     const eventEmitter = useContext(HeaderContext).eventEmitter;
//     return eventEmitter;
// };

export default Header;

export { HeaderContext, useMessage, useRefresh };
