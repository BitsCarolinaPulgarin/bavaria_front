import Person from "@material-ui/icons/Person";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";

const dashboardRoutes = [
  {
    path: "/user",
    name: "Usuarios",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Nómina",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },
];

export default dashboardRoutes;
