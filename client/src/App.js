"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("./contexts/AuthContext");
var CartContext_1 = require("./contexts/CartContext");
var Layout_1 = require("./components/Layout");
var Home_1 = require("./pages/Home");
var Products_1 = require("./pages/Products");
var ProductDetail_1 = require("./pages/ProductDetail");
var Cart_1 = require("./pages/Cart");
var Login_1 = require("./pages/Login");
var Register_1 = require("./pages/Register");
var Profile_1 = require("./pages/Profile");
var Orders_1 = require("./pages/Orders");
var ProtectedRoute_1 = require("./components/ProtectedRoute");
function App() {
    return (<AuthContext_1.AuthProvider>
      <CartContext_1.CartProvider>
        <Layout_1.default>
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/" element={<Home_1.default />}/>
            <react_router_dom_1.Route path="/products" element={<Products_1.default />}/>
            <react_router_dom_1.Route path="/products/:id" element={<ProductDetail_1.default />}/>
            <react_router_dom_1.Route path="/cart" element={<Cart_1.default />}/>
            <react_router_dom_1.Route path="/login" element={<Login_1.default />}/>
            <react_router_dom_1.Route path="/register" element={<Register_1.default />}/>
            <react_router_dom_1.Route path="/profile" element={<ProtectedRoute_1.default>
                  <Profile_1.default />
                </ProtectedRoute_1.default>}/>
            <react_router_dom_1.Route path="/orders" element={<ProtectedRoute_1.default>
                  <Orders_1.default />
                </ProtectedRoute_1.default>}/>
          </react_router_dom_1.Routes>
        </Layout_1.default>
      </CartContext_1.CartProvider>
    </AuthContext_1.AuthProvider>);
}
exports.default = App;
