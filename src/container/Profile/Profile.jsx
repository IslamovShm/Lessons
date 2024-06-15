import { useEffect, useState } from 'react';
import {  NavLink } from 'react-router-dom'
import { userObj } from '../../service/common';
import { getMyCourses } from '../../service/Courses';
import { useDispatch } from 'react-redux'
import { setCourse } from '../../store/actions';

import styles from './Profile.module.css'

const Profile = () => {
    const [myCourses, setMyCourses] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchCourses = async () => {
            let courses = await getMyCourses(userObj.token)
            setMyCourses(courses)
        }

        fetchCourses()
    }, [])

    const setModules = (course) => {
        dispatch(setCourse(course))
    }

    return (
        <div className={styles.container}>
            <h1> Hello {userObj.username}</h1>


            <div className={styles.courses__wrapper}>
                {
                    myCourses.map(course => (
                        <div 
                            key={course.id}
                        >
                            <p>{course.name}</p>
                            <NavLink to={`/course/${course.id}`} onClick={() => setModules(course)}>
                                <button>got to course</button>
                            </NavLink>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


export default Profile;