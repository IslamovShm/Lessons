import Lessons from "../container/Lessons/Lessons"
import RegistrationForm from "../container/RegistrationForm/RegistrationForm"
import Profile from "../container/Profile/Profile"
import Course from "../container/Course/Course"


const routesConfig = [
    {
        path: '/',
        exact: 'true',
        element: <RegistrationForm />
    },
    {
        path: '/profile',
        exact: 'true',
        element: <Profile />
    },
    {
        path: '/course/:id',
        exact: 'true',
        element: <Course />
    },
    {
        path: '/lesson/:id',
        exact: 'true',
        element: <Lessons />
    },
]

export default routesConfig