import { useEffect, useState } from 'react';
import { getMyCourses, getLessons, getSection } from '../../service/Courses';
import { userObj } from '../../service/common';
import cn from 'classnames'

import styles from './Course.module.css'
import { NavLink, useParams } from 'react-router-dom';


const Course = () => {
    const [data, setData] = useState()
    const [sections, setSections] = useState()
    const [modules, setModules] = useState()
    const [section, setSection]= useState(0)
    const token = userObj.token

    const { id } = useParams()


    useEffect(() => {
        const fetchCourse = async () => {
            const dataObj = await getMyCourses(token)
            const sectionsObj = await getSection(id, token)
            const modulesObj = await getLessons(sectionsObj[section].id)
            setData(dataObj.find(obj => obj.id == id))
            setSections(sectionsObj)
            setModules(modulesObj)
        }

        fetchCourse()
    }, [section])

    console.log(sections)

    return (
        data && 
        <div className={styles.container}>
            <h1 className={styles.course__title}>{data.name}</h1>
            <p className={styles.course__description}>{data.description}</p>

            <div className={styles.sections__wrapper}>
                {
                    sections && sections.map(section => (
                        <div key={section.id} className={cn(styles.section, section.user_id ? styles.section__active : '')}>
                            <h3>{section.title}</h3>
                            <p>{section.description}</p>
                            <button disabled={section.user_id ? false : true} onClick={() => setSection(section.id)}>Open section</button>
                        </div>
                    ))
                }
            </div>

            <div className={styles.modules__wrapper}>
                {
                    modules && modules.map(module => (
                        <div key={module.id} className={styles.module}>
                            <h4>{module.title}</h4>
                            <NavLink to={`/lesson/${module.id}`}>
                                <p>{module.type}</p>
                            </NavLink>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Course;