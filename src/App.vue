<script >
    import HomePage from './pages/HomePage.vue';
    // import AppHeader from './components/AppHeader.vue';

    export default{
      components :{
        HomePage,
        // AppHeader,
      }
     }


</script>

<template>

  <div>
    <!-- <AppHeader/> -->
    <HomePage/>
  </div>
  

</template>

<style  lang="scss">
@use './styles/generals.scss' as *

</style>
