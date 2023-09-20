
<!-- JAVASCRIPT & VUE.JS -->
<script>
export default {

    name:'MapApartament',

    data() {
        return {
            
        }
    },
    mounted() {
        this.viewMap()
    },
    methods: {
       viewMap(){
        var speedyPizzaCoordinates = [-121.91595, 37.36729]
        let map = tt.map({
            container: "map",
            key: "zXBjzKdSap3QJnfDcfFqd0Ame7xXpi1p",
            center: speedyPizzaCoordinates,
            zoom:13
        })
        var marker = new tt.Marker().setLngLat(speedyPizzaCoordinates).addTo(map)
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