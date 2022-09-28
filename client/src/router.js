import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import signIn from './views/signIn.vue'
import signUp from './views/signUp.vue'
import Admin from './views/Admin.vue'
import Catalogue from './views/Catalogue.vue'
import ShoppingCart from './views/shoppingCart.vue'
import Profile from './views/Profile.vue'
import EditProfile from '@/views/EditProfile.vue'
import Checkout from './components/CheckOut.vue'
import CreateStore from './views/createStore.vue'
import PaymentMethod from './views/choosePayment.vue'
import ShoppingCartCheckOut from './components/getShoppingCart.vue'
import OrderSummary from './views/orderSummary.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/signIn',
      name: 'signIn',
      component: signIn
    }, {
      path: '/signUp',
      name: 'signUp',
      component: signUp
    }, {
      path: '/admin',
      name: 'admin',
      component: Admin
    }, {
      path: '/catalogue',
      name: 'catalogue',
      component: Catalogue
    }, {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: ShoppingCart
    }, {
      path: '/Profile',
      name: 'profile',
      component: Profile
    }, {
      path: '/editProfile',
      name: 'editProfile',
      component: EditProfile
    }, {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/createStore',
      name: 'createStore',
      component: CreateStore
    },
    {
      path: '/checkout/paymentMethod',
      name: 'paymentMethod',
      component: PaymentMethod
    },
    {
      path: '/checkout/shoppingCart',
      name: 'shoppingCart',
      component: ShoppingCart
    },
    {
      path: '/checkout/shoppingCart',
      name: 'shoppingCartCheckout',
      component: ShoppingCartCheckOut
    },
    {
      path: '/checkout/order',
      name: 'order',
      component: OrderSummary
    }
  ]
})
