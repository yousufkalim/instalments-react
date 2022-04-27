/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Candidates from "views/candidates/Candidates";
import ViewCandidate from "views/candidates/ViewCandidate";
import Plans from "views/InstallmentPlans/Plans";
import Companies from "views/companies/Companies";
import Register from "views/Register.js";
import Login from "views/Login.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-red",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "All Users",
    icon: "ni ni-single-02 text-primary",
    component: Candidates,
    layout: "/admin",
  },
  {
    path: "/installment-plans",
    name: "All Installment Plans",
    icon: "ni ni-single-02 text-yellow",
    component: Plans,
    layout: "/admin",
  },
  {
    path: "/companies",
    name: "All Companies",
    icon: "ni ni-single-02 text-red",
    component: Companies,
    layout: "/admin",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-key-25 text-info",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-circle-08 text-pink",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/ViewCandidate",
    name: "View Candidate",
    icon: "ni ni-circle-08 text-pink",
    component: ViewCandidate,
    layout: "/users",
  },
];
export default routes;
