<template>
    <div id="app">
      <ShoppingCart />
    </div>
  </template>
  
  <script>
  import ShoppingCart from './components/carts.vue'
  
  export default {
    name: 'App',
    components: {
      ShoppingCart
    }
  }
  </script>
  
  <style>
  /* 在此处添加全局样式 */
  </style>