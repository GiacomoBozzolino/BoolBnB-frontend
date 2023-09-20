
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

            axios.get(`${store.apartmensUrl}/api/apartments/${this.$route.params.slug}`).then((response) =>{
                if(response.data.success){
                    this.apartment =response.data.apartment
                    store.loading=false
                }else{
                    this.$router.push({name:'not-found'});
                }
                console.log(this.apartment.latitude)


                
                // var speedyPizzaCoordinates = [this.apartment.latitude, this.apartament.longitude]
                let long = this.apartment.longitude
                let latitude = this.apartment.latitude
                let map = tt.map({
                    container: "map",
                    key: "zXBjzKdSap3QJnfDcfFqd0Ame7xXpi1p",
                    center: [long, latitude],
                    zoom:13
                })
                var marker = new tt.Marker().setLngLat([long, latitude]).addTo(map)
                
                
            });
        


        // var speedyPizzaCoordinates = [-121.91595, 37.36729]
        // let map = tt.map({
        //     container: "map",
        //     key: "zXBjzKdSap3QJnfDcfFqd0Ame7xXpi1p",
        //     center: speedyPizzaCoordinates,
        //     zoom:13
        // })
        // var marker = new tt.Marker().setLngLat(speedyPizzaCoordinates).addTo(map)
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
    width: 500px;
        
}


</style>