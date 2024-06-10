const API_URL = "http://localhost:3000/req"
export async function getTodosAPI(){
    return fetch(API_URL)
    .then(resp => resp.json())
    .then(data => data)
    .catch(e => console.log(e))
}
export async function postTodosAPI(todo){
    return fetch(API_URL,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })
    .then(resp => {
        return resp.json()
    })
    .then(data => data)
    .catch(e => console.log(e))
}
export async function patchTodosAPI(id,title,text,deadline){
    let todo = {
        _id: id,
        title: title,
        text:text,
        deadline:deadline
    }
    return fetch(API_URL+`/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })
    .then(resp => resp.json())
    .then(data => data)
    .catch(e => console.log(e))
}
export async function deleteTodosAPI(id){
    return fetch(API_URL+`/${id}`,{
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => data)
    .catch(e => console.log(e))
}
export async function getOneTodosAPI(id){
    return fetch(API_URL+`/${id}`,{
        method: "GET"
    })
    .then(resp => resp.json())
    .then(data => data)
    .catch(e => console.log(e))
}