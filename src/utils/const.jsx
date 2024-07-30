import Home from "../page/home/home.jsx";
import Login from "../page/login/login.jsx";
import Layout_Cabinet from "../page/Cabinet/layout/layout_Cabinet.jsx";
import Month_history_user from "../page/Cabinet/user_pages/month_history/month_history_user";
import Year_history_user from "../page/Cabinet/user_pages/year_history/year_history_user";
import ListUsers from "../page/Cabinet/admin_pages/admin_list_users/list_users";
import User_page from "../page/Cabinet/admin_pages/admin_list_users/user_list_user_page/user_page";

// Public
export const HOME = '/'

// Login
export const LOGIN = '/login'

// dashboard
export const CABINET = "/cabinet/";

// user dashboard
export const CURRENT_MONTH_USER = 'current_month'
export const CURRENT_YEAR_USER = 'current_year'


// admin dashboard
export const USER_LIST_ADMIN = 'user_list'
export const USER_LIST_USER_PAGE_ADMIN = 'user_list/:id'

export const RouterData =[
    {
        path:HOME,
        Component:<Home/>
    },
    {
        path:LOGIN,
        Component:<Login/>
    },
]

export const Layout = [
    {path:CABINET , Component:<Layout_Cabinet/>}
]

export const User_Route = [
    {path:CURRENT_MONTH_USER , Component:<Month_history_user/>},
    {path:CURRENT_YEAR_USER , Component:<Year_history_user/>},
]
export const Admin_Route = [
    {path:USER_LIST_ADMIN , Component:<ListUsers/>},
    {path:USER_LIST_USER_PAGE_ADMIN , Component:<User_page/>},

]