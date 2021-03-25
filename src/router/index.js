import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login/Login'
import AHome from '@/components/home/AHome'
import Welcome from '@/components/home/Welcome'
import Student from '@/components/student/Student'
import Teacher from '@/components/teacher/Teacher'
import StudentCourse from '@/components/student/StudentCourse'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: AHome,
    redirect: '/welcome',
    children:[
      {
        path: '/welcome',
        component: Welcome
      },
      {
        name: 'student_course',
        path: '/student_course/:id/:name',
        component: StudentCourse
      },
      {
        path: '/student',
        component: Student
      },
      {
        path: '/teacher',
        component: Teacher
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const token = window.sessionStorage.getItem('token');
  if (!token) return next('/login');
  next();
})

export default router
