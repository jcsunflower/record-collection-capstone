import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import Collections from '@/views/Collections.vue'
import Library from '@/views/Library.vue'
import RecordDetails from '@/views/RecordDetails.vue'
import CollectionDetails from '@/views/CollectionDetails.vue'

Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/",
      name: "home",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/collections",
      name: "addCollection",
      component: Collections,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/collections",
      name: "getAllCollections",
      component: Collections,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/collections/:id",
      name: "collectionById",
      component: Collections,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/library",
      name: "addRecord",
      component: Library,
      meta: {
        requiresAuth: false
      }
   },
   {
     path: "/library",
     name: "viewRecords",
     component: Library,
     meta: {
      requiresAuth: false
      }
   },
    {
      path: "/library/:id",
      name: "recordDetails",
      component: RecordDetails,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/collections/:collectionId/records",
      name: "collectionDetails",
      component: CollectionDetails,
      meta: {
        requiresAuth: false
      }
    }
   
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
