<script >
    import HomePage from './pages/HomePage.vue';
    import AppHeader from './components/AppHeader.vue';

    export default{
      components :{
        HomePage,
        AppHeader,
      }
     }


</script>

<template>

  <div class="margin-top">
    <AppHeader/>
    <router-view></router-view>
  </div>
  

</template>

<style  lang="scss">
@use './styles/generals.scss' as *;

.margin-top{
  margin-top: 135px;
}

</style>
