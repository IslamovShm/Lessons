export const endpoint = 'https://demoschool.senet.uz/app/index.php'

const user = JSON.parse(localStorage.getItem('user'))
export const userObj = user ? user : {}

export function generateInstance(body, header = {}) {
    const h = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': 'application/x-www-form-urlencoded',
        ...header,
    });
    let url = endpoint + (body.action ? `?action=${body.action}` : '');
    return fetch(url, {
        method: 'post',
        headers: h,
        body: new URLSearchParams(body)
    });
}

export function setProfileUser(obj){
    localStorage.setItem('user', JSON.stringify(obj))
}