import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login/Login'
import AHome from '@/components/home/AHome'
import Welcome from '@/components/home/Welcome'
import Student from '@/components/admin_view/student/Student'
import Teacher from '@/components/admin_view/teacher/Teacher'
import StudentCourse from '@/components/admin_view/student/StudentCourse'
import Course from '@/components/admin_view/course/Course'
import TeacherCourse from '@/components/admin_view/teacher/TeacherCourse'
import CourseStudent from '@/components/admin_view/course/CourseStudent'
import SHome from '@/components/home/SHome'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/student_home',
    component: SHome
  },
  {
    path: '/admin_home',
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
        name: 'teacher_course',
        path: '/teacher_course/:id/:name',
        component: TeacherCourse
      },
      {
        path: '/student',
        component: Student
      },
      {
        path: '/teacher',
        component: Teacher
      },
      {
        path: '/course',
        component: Course
      },
      {
        name: 'course_student',
        path: '/course_student/:id/:name',
        component: CourseStudent
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
