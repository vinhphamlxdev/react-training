import Home from "../pages/Home";
import Product from "../pages/Products";
import SignUp from "../pages/SignUp";
import Todo from "../pages/Todo";
export const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/products",
    component: Product,
  },
  {
    path: "/todo",
    component: Todo,
  },
  {
    path: "/signup",
    component: SignUp,
  },
];
