import { RepositoryFactory } from "@/api/RepositoryFactory";
import axios from "axios";

export default {
    state: {
        token: localStorage.getItem('auth_token') ? localStorage.getItem('auth_token') : null,
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem('auth_token', token);
        },
        SET_USER(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        REMOVE_TOKEN(state) {
            state.token = null;
            localStorage.removeItem('auth_token');
        },
        REMOVE_USER(state) {
            state.user = null;
            localStorage.removeItem('user');
        }
    },
    actions: {
        LOGIN(context, payload) {
            return new Promise((resolve, reject) => {
                RepositoryFactory.get('auth').login(payload).then(({ data }) => {
                    context.commit("SET_TOKEN", data.token);
                    context.commit("SET_USER", data.user)
                    resolve();
                }).catch((err) => reject(err));
            })
        },
        LOGOUT(context) {
            return new Promise((resolve, reject) => {
                context.commit("REMOVE_TOKEN");
                context.commit("REMOVE_USER");
                resolve();
            })
        }
    },
    getters: {
        AUTH_USER(state) {
            return state.user;
        },
        AUTH_TOKEN(state) {
            return state.token;
        },
        IS_AUTHENTICATED(state) {
            return !!state.token;
        }
    }
}