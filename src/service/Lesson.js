const endpoint = 'https://demoschool.senet.uz/app/index.php'

export async function getQuestion(module_id) {
    const tokenSt = 'b7d9c313e196d83ae7e31a275bc39c632bd475ea';
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


export async function event_log(action, comment) {
    const tokenSt = 'b7d9c313e196d83ae7e31a275bc39c632bd475ea';
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
    const tokenSt = 'b7d9c313e196d83ae7e31a275bc39c632bd475ea';
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