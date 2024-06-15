import { generateInstance } from "./common";
import { userObj } from "./common";

const token = userObj.token

export async function getQuestion(module_id) {
    const tokenSt = token;
    const body = {
        "action": "module_questions",
        "module_id": module_id
    };
    return await generateInstance(body, { 'X-Student-Auth': tokenSt })
        .then(async (response) => {
            let data = await response.json()
            if(Array.isArray(data)){
                return data.map((q) => {
                    if(q.other) {
                        q.other = JSON.parse(q.other)
                    }
                    return q;
                });
            } else {
                return []
            }
        }).catch((e) => {
            return [];
        });
}


export async function event_log(action, comment) {
    const tokenSt = token;
    if (tokenSt && tokenSt?.length > 0) {
        const body = {
            "action": "event_log",
            "event_action": action,
            "comment": comment,
        };
        generateInstance(body, { 'X-Student-Auth': tokenSt })
            .then((response) => { })
            .catch((e) => { });
    }
}

export async function questionTry(question_id, answer, correct) {
    const tokenSt = token;
    const body = {
        "action": "question_try",
        "question_id": question_id,
        "answer_id": answer,
        "correct": correct,
    };
    return await generateInstance(body, { 'X-Student-Auth': tokenSt })
        .then((response) => {
        }).catch((e) => {
        });
}