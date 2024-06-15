import { generateInstance } from "./common";

export async function login(username, password) {
    let res = null;
    const body = {
        "action": "login",
        "username": username,
        "password": password,
    };
    res = await generateInstance(body).then((response) => {
        return response.json();
    }).catch((e) => {
        return {
            token: ""
        };
    });
    return res;
}