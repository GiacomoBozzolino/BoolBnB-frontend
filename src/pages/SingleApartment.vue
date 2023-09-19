<script>
    import axios from 'axios';
    import { store } from '../store';
    import AppLoader from '../components/AppLoader.vue';

    export default {
        name:'SingleApartment',

        data() {
            return {
                store,
                apartment:'',
                AppLoader,
            }
        },

        created() {
            this.getSingleApartment()
        },

        methods: {
            getSingleApartment(){
                store.loading=true
                axios.get(`${store.apartmensUrl}/api/apartments/${this.$route.params.slug}`).then((response) =>{
                    if(response.data.success){
                        this.apartment =response.data.apartment
                        store.loading=false
                    }else{
                        this.$router.push({name:'not-found'});
                    }

                });
            }
        },
    }

</script>


<template lang="">

<div class="container">
        <div class="row" v-if="store.loading">
            <div class="col-12 d-flex justify-content-center" >
                <AppLoader/>
            </div>
        </div> 
        <div class="row" v-else>
            <div class="col-12">
                <h1 class="text-center"> {{apartment.title}}</h1>
            </div>
            <div class= "d-flex justify-content-center">
                <img :src="`${store.apartmensUrl}/storage/${apartment.cover_img}`" class="img-fluid w-50 " :alt="apartment.title"/>
            </div>
            <ul>
                <li>
                    <p>
                        {{apartment.description}}
                    </p>
                </li>
                <li>
                    numero di stanze: {{apartment.n_rooms}}
                </li>
                <li>
                    Stanze da letto: {{apartment.n_beds}}
                </li>
                <li>
                    Bagni: {{apartment.n_beds}}
                </li>
                
                <li>
                    <span class="badge text-bg-primary text-decoration-none mx-2" v-for='item in apartment.services' :key='item.id'>
                        {{item.type}}
                    </span>
                </li>
            </ul>   
        </div>   
    </div>

</template>





<style lang="scss">
    
</style>