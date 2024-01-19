<template>
  <div>
    <CustomLink v-for="link in links" :key="link.to" :link="link" />
    <!-- <router-link :to="{ name: 'home' }">Pokémon List</router-link>
    <router-link :to="{ name: 'pokemon-id', params: { id: 85 } }"
      >Pokémon por Id</router-link
    >
    <router-link :to="{ name: 'about' }">About</router-link> -->
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  name: "Navbar",
  components: {
    CustomLink: defineAsyncComponent(() => import("./CustomLink.vue")),
  },
  data() {
    return {
      links: [
        {
          to: "pokemon-home",
          name: "Pokemons",
        },
        {
          to: "pokemon-id",
          name: "Por Id",
          id: 151,
        },
        {
          to: "pokemon-about",
          name: "About",
        },
        {
          to: "dbz-characters",
          name: "Personajes",
        },
        {
          to: "dbz-about",
          name: "DBZ-about",
        },
        {
          to: "https://google.com",
          name: "Google",
        },
      ],
    };
  },
};
</script>

<style scoped>
div {
  padding: 0 30px;
}

div a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
  text-decoration: none;
}

/*
a.router-link-exact-active {
  color: #42b983;
}
 */
</style>
