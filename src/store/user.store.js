import userService from '../services/user.service.js'

var localLoggedInUser = null;
if (sessionStorage.user) localLoggedInUser = JSON.parse(sessionStorage.user);

export default {
    state: {
        users: [],
        loggedInUser: localLoggedInUser,
    },
    getters: {
        loggedInUser(state) {
            return JSON.parse(JSON.stringify(state.loggedInUser))
        },
        users(state) {
            return state.users;
        },
    },
    mutations: {
        setUser(state, { user }) {
            console.log('setUser', state.loggedInUser)
            state.loggedInUser = user;
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        },
        setUsers(state, { users }) {
            state.users = users;
        }
    },
    actions: {
        async login(context, { userCred }) {
            const user = await userService.login(userCred);
            console.log('login', user);
            context.commit({ type: 'setUser', user })
            return user;
        },
        async signup(context, { userCred }) {
            const user = await userService.signup(userCred)
            context.commit({ type: 'setUser', user })
            return user;

        },
        async logout(context) {
            await userService.logout()
            context.commit({ type: 'setUser', user: null })
        },
        async removeUser(context, { userId }) {
            await userService.remove(userId);
            context.commit({ type: 'removeUser', userId })
        },
        async updateUser(context, { userCred }) {
            const user = await userService.update(userCred);
            context.commit({ type: 'setUser', user })
        }, 
        async loadUsers(context) {
            const users = await userService.getUsers();
            context.commit({ type: 'setUsers', users })
        },
    }
}