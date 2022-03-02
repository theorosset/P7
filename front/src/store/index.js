import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

function getPosts(token) {
  return axios.get("http://localhost:3000/api/groupomania/post", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

function getProfil(token) {
  return axios.get("http://localhost:3000/api/auth/profil", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function deletePost(token, postId) {
  return axios
    .delete(`http://localhost:3000/api/groupomania/post/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => alert("votre status a bien été supprimer"))
    .catch(() => {
      return alert("Nous avons pas réussis a supprimer votre status");
    });
}

function getToken() {
  return localStorage.getItem("token");
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],

    profil: [],
  },
  getters: {},
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },

    SET_PROFIL(state, profil) {
      state.profil = profil;
    },

    DELETE_POSTS(state, postId) {
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      const token = getToken();
      const posts = await getPosts(token);

      commit("SET_POSTS", posts.data);
    },
    async fetchProfil({ commit }) {
      const token = getToken();
      const profil = await getProfil(token);

      commit("SET_PROFIL", profil.data);
    },

    async deletePost({ commit }, postId) {
      const token = getToken();
      await deletePost(token, postId);

      commit("DELETE_POSTS", postId);
    },
  },
  modules: {},
});
