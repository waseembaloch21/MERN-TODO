const dev = 'http://localhost:4000/'
const prod = 'https://batch-11-node-with-mongodb.onrender.com/'


const BASE_URL = prod


export const AppRoutes = {
    login: BASE_URL + "auth/login",
    register: BASE_URL + "auth/register",
    addTask: BASE_URL + "task",
    getTask: BASE_URL + "task",
    myInfo: BASE_URL + "user/myInfo",
}