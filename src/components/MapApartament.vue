
<!-- JAVASCRIPT & VUE.JS -->

<script>
import axios from 'axios';
import { store } from '../store';
export default {

    name:'MapApartament',


    data() {
        return {
            apartment:'',
        }
    },
    mounted() {
        this.viewMap()
    },
    methods: {
       viewMap(){
            // chiamata api degli appartamenti
            axios.get(`${store.apartmensUrl}/api/apartments/${this.$route.params.slug}`).then((response) =>{
                if(response.data.success){
                    this.apartment =response.data.apartment
                    store.loading=false
                }else{
                    this.$router.push({name:'not-found'});
                }
                console.log(this.apartment.latitude)


                
                // funzione introduzione mappa prendendo la latitudine e la longitudine dalla chiamata api degli appartamenti
                let long = this.apartment.longitude
                let latitude = this.apartment.latitude
                let map = tt.map({
                    container: "map",
                    key: "zXBjzKdSap3QJnfDcfFqd0Ame7xXpi1p",
                    center: [long, latitude],
                    zoom:15
                })
                var marker = new tt.Marker().setLngLat([long, latitude]).addTo(map)
                
                
            });
        
        }
    },

    

}
</script>

<!-- TEMPLATE HTML -->
<template lang="">
    <div id='map'></div>
</template>

<!-- STYLE SCSS -->
<style lang="scss">
#map{
    height: 500px;
    width: 100%;
        
}


</style>