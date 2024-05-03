import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import TeacherPage from "./components/TeacherPage.vue";
import StudentPage from "./components/StudentPage.vue";
import CustomTable from "./components/CustomTable.vue";
import FinalComp from "./components/FinalComp.vue";

const routes = [
  { path: "/login", component: Login },
  { path: "/signup", component: SignUp },
  { path: "/teacher", component: TeacherPage },
  { path: "/student", component: StudentPage },
  { path: "/table", component: CustomTable },
  { path: "/createCertificate", component: FinalComp },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
