import { createRouter, createWebHashHistory } from "vue-router";
import isAuthenticatedGuard from "./auth-guard";

const routes = [
  {
    path: "/",
    redirect: "pokemon",
  },
  {
    path: "/pokemon",
    name: "pokemon",
    component: () =>
      import(
        /* webpackChunkName: "PokemonLayout"*/ "@/modules/pokemon/layouts/PokemonLayout.vue"
      ),
    children: [
      {
        path: "home",
        name: "pokemon-home",
        component: () =>
          import(
            /*webpackChunkName: "ListPage"*/ "@/modules/pokemon/pages/ListPage.vue"
          ),
      },
      {
        path: "about",
        name: "pokemon-about",
        component: () =>
          import(
            /*webpackChunkName: "AboutPage"*/ "@/modules/pokemon/pages/AboutPage.vue"
          ),
      },
      {
        path: "pokemonid/:id",
        name: "pokemon-id",
        component: () =>
          import(
            /*webpackChunkName: "PokemonPage"*/ "@/modules/pokemon/pages/PokemonPage.vue"
          ),
        props: (route) => {
          // console.log(route);
          const { id } = route.params;
          return isNaN(Number(id)) ? { id: 1 } : { id: Number(id) };
        },
      },
      {
        path: "",
        redirect: {
          name: "pokemon-about",
        },
      },
    ],
  },
  {
    path: "/dbz",
    name: "dbz",
    beforeEnter: [isAuthenticatedGuard],
    component: () =>
      import(
        /* webpackChunkName:"DbzLayout" */ "@/modules/dbz/layouts/DragonBallLayout.vue"
      ),
    children: [
      {
        path: "characters",
        name: "dbz-characters",
        component: () =>
          import(
            /* webpackChunkName: "DbzCharactersPage" */ "@/modules/dbz/pages/Characters.vue"
          ),
      },
      {
        path: "about",
        name: "dbz-about",
        component: () =>
          import(
            /* webpackChunkName: "DbzAboutPage" */ "@/modules/dbz/pages/About.vue"
          ),
      },
      {
        path: "",
        redirect: {
          name: "dbz-characters",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    // redirect: "/home",
    component: () =>
      import(
        /*webpackChunkName: "NoPageFound"*/ "@/modules/shared/pages/NoPageFound.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Sync Global Guard
// router.beforeEach((to, from, next) => {
//   const random = Math.random() * 100;
//   if (random > 50) {
//     console.log("Autenticado");
//     next();
//   } else {
//     console.log(random, "Bloqueado por beforeEachGuard");
//     next({ name: "pokemon-home" });
//   }
// });

// Async Global Guard
// const canAccess = () => {
//   return new Promise((resolve) => {
//     const random = Math.random() * 100;
//     if (random > 50) {
//       console.log("Autenticado - can access");
//       resolve(true);
//     } else {
//       console.log(random, "Bloqueado por beforeEachGuard");
//       resolve(false);
//     }
//   });
// };

// router.beforeEach(async (to, from, next) => {
//   const authorized = await canAccess();
//   authorized ? next() : next({ name: "pokemon-home" });
// });

export default router;
