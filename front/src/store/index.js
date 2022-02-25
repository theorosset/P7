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

function getComments(token, postId) {
  return axios.get(`http://localhost:3000/api/groupomania/comment/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
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
    comments: [],
  },
  getters: {},
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments;
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

    async fetchComments({ commit }, postId) {
      const token = getToken();
      const comments = await getComments(token, postId);

      commit("SET_COMMENTS", comments.data);
    },

    async deletePost({ commit }, postId) {
      const token = getToken();
      await deletePost(token, postId);

      commit("DELETE_POSTS", postId);
    },
  },
  modules: {},
});
