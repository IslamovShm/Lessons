import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { login } from '../../service/Registration';
import { setProfileUser } from '../../service/common';


import styles from './RegistrationForm.module.css'

const RegistrationForm = () => {
    const [successRegistration, setSuccessRegistration] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [user, setUser] = useState()
    const navigate = useNavigate()

    const checkRegistration = async (username, password) => {
        let res = await login(username, password)
        if('id' in res){
            setUser(res)
            setSuccessRegistration(true)
        }else{
            setSuccessRegistration(false)
        }
    }

    useEffect(() => {
        if(successRegistration){
            setProfileUser(user)
            navigate('/profile')
        }
    }, [successRegistration])

    return (
        <div className={styles.container}>
            <div className={styles.registration__wrapper}>
                <input type="email" placeholder='Введите логин' onChange={(event) => setUsername(event.target.value)}/>
                <input type="password" placeholder='Введите пароль' onChange={(event) => setPassword(event.target.value)}/>
                <button onClick={() => checkRegistration(username, password)}>
                    войти
                </button>
            </div>
        </div>
    )
}

export default RegistrationForm;