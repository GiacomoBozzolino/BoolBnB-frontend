<script >
    import HomePage from './pages/HomePage.vue';
    import AppHeader from './components/AppHeader.vue';
    import AppFooter from './components/AppFooter.vue';

    export default{
      components :{
        HomePage,
        AppHeader,
        AppFooter,

      }
     }


</script>

<template>

  <div class="margin-top">
    <AppHeader/>
    <router-view></router-view>
    <AppFooter/>
  </div>
  

</template>

<style  lang="scss">
@use './styles/generals.scss' as *;

.margin-top{
  margin-top: 135px;
}

</style>
