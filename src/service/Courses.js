import { generateInstance, userObj } from "./common";

const token = userObj.token

export async function getSection(course_id, authToken) {

    const body = {
        "action": "course_sections",
        "course_id": course_id,
    };
    return await generateInstance(body, { 'X-Student-Auth': authToken })
        .then((response) => {
            return response.json();
        }).catch((e) => {
            return [];
        });
}

export async function getCourses(token, course_id = null) {
    let res = null;
    const body = {
        "action": "course_index",
        "course_id": course_id
    };
    return await generateInstance(body,{'X-Student-Auth': token})
        .then((response) => {
            return response.json();
        }).catch((e) => {
            return [];
        });
}
export async function getMyCourses(token, course_id = null) {
    let res = null;
    const body = {
        "action": "course_student",
        "course_id": course_id
    };
    return await generateInstance(body,{'X-Student-Auth': token})
        .then((response) => {
            return response.json();
        }).catch((e) => {
            return [];
        });
}

export async function getLessons(sectionId) {
    const tokenSt = token;
    const body = {
        "action": "course_modules",
        "section_id": sectionId
    };
    return await generateInstance(body, { 'X-Student-Auth': tokenSt })
        .then((response) => {
            let data = response.json()
            return data;
        }).catch((e) => {
            return [];
        });
}