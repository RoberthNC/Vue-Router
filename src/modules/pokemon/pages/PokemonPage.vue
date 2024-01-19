<template>
  <h2>
    Pokémon: #<span>{{ id }}</span>
  </h2>
  <div v-if="pokemon">
    <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  name: "Pokemon",
  data() {
    return {
      // id: $route.params.id,
      pokemon: null,
    };
  },
  created() {
    // const id = this.$route.params;
    // console.log(id);
    // this.id = id;
    // console.log(this.$attrs);
    this.getPokemon();
  },
  methods: {
    async getPokemon() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${this.id}`
        );
        const pokemon = await response.json();
        this.pokemon = pokemon;
      } catch (error) {
        this.$router.push("/");
        console.log("No hay nada que hacer");
      }
    },
  },
  watch: {
    id(newValue, oldValue) {
      console.log("Anterior ", oldValue);
      console.log("Nuevo ", newValue);
      this.getPokemon();
    },
  },
};
</script>
