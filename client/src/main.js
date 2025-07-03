"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
var react_router_dom_1 = require("react-router-dom");
var react_query_1 = require("react-query");
var App_tsx_1 = require("./App.tsx");
require("./index.css");
var queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});
client_1.default.createRoot(document.getElementById('root')).render(<react_1.default.StrictMode>
    <react_query_1.QueryClientProvider client={queryClient}>
      <react_router_dom_1.BrowserRouter>
        <App_tsx_1.default />
      </react_router_dom_1.BrowserRouter>
    </react_query_1.QueryClientProvider>
  </react_1.default.StrictMode>);
