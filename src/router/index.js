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
import AllCourse from '@/components/student_view/AllCourse'
import MyCourse from '@/components/student_view/MyCourse'
import CourseDetail from '@/components/student_view/CourseDetail'
import AllTeacher from '@/components/student_view/AllTeacher'
import TeacherDetail from '@/components/student_view/TeacherDetail'
import THome from '@/components/home/THome'
import MyTeachingCourse from '@/components/teacher_view/MyTeachingCourse'
import TeachingCourseDetail from '@/components/teacher_view/TeachingCourseDetail'

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
    path: '/teacher_home',
    component: THome,
    redirect: '/hello',
    children: [
      {
        name: 'hello',
        path: '/hello',
        component: Welcome
      },
      {
        name: "myTeachingCourse",
        path: "/myTeachingCourse",
        component: MyTeachingCourse
      },
      {
        name: 'teachingCourseDetail',
        path: '/teachingCourse_detail/:courseId',
        component: TeachingCourseDetail,
        props: route => {
          return {courseId: route.params.courseId};
        }
      }
    ]
  },
  {
    path: '/student_home',
    component: SHome,
    redirect: '/allCourse',
    children: [
      {
        name: 'allCourse',
        path: '/allCourse',
        component: AllCourse
      },
      {
        name: 'myCourse',
        path: '/myCourse',
        component: MyCourse
      },
      {
        name: 'allTeacher',
        path: '/allTeacher',
        component: AllTeacher
      },
      {
        name: 'courseDetail',
        path: '/course_detail/:courseId',
        component: CourseDetail,
        props: route => {
          return {courseId: route.params.courseId};
        }
      },
      {
        name: 'teacherDetail',
        path: '/teacher_detail/:teacherId',
        component: TeacherDetail,
        props: route => {
          return {teacherId: route.params.teacherId};
        }
      }
    ]
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
