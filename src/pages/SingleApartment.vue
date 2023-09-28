<script>
    import axios from 'axios';
    import { store } from '../store';
    import AppLoader from '../components/AppLoader.vue';
    import ContactForm from '../components/ContactForm.vue';
    import MapApartament from '../components/MapApartament.vue';

    export default {
        name:'SingleApartment',
        
        components:{
                AppLoader,
                ContactForm,
                MapApartament,
            },

        data() {
            
            return {
                store,
                apartment:'',
               
            }
        },

        created() {
            this.getSingleApartment()
        },

        methods: {
            getSingleApartment(){
                store.loading=true
                axios.get(`${store.apartmentsUrl}/api/apartments/${this.$route.params.slug}`).then((response) =>{
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

    <div class="container" v-if="store.loading">
        <div class="row" >
            <div class="col-12 d-flex justify-content-center" >
                <AppLoader/>
            </div>
        </div> 
    </div>

    
    <div class='container py-3' v-else>

        <div class='row'>
            <div class="col-6">
                <img :src="`${store.apartmentsUrl}/storage/${apartment.cover_img}`" class="img-fluid " :alt="apartment.title"/>
            </div>
            <div class="col-6">
                <ul>
                    <li class='pb-3'><h2>{{ apartment.title}}</h2></li>
                    <li><strong>Numero stanze:</strong> {{apartment.n_rooms}}</li>
                    <li><strong>Numero letti:</strong> {{apartment.n_beds}}</li>
                    <li><strong>Numero bagni:</strong> {{apartment.n_bathrooms}}</li>
                    <li><strong>Indirizzo:</strong> {{apartment.address}}</li>
                    
                    <li><strong>Dimensione dell'appartamento:</strong> {{apartment.square_meters}} metri quadrati</li>
                    <li>
                        <strong>Servizi:</strong>
                        <span class="badge text-bg-primary text-decoration-none mx-2" v-for='item in apartment.services' :key='item.id'>
                            {{item.type}}
                        </span>
                    </li>
                </ul>
            </div>

        </div>

    </div>

    <!-- Map + ContactForm -->
    <div class="container">
        <div class="row">
            <div class="col-12 mt-3">
                <div class="row justify-content-center">
                    <MapApartament :apartment="[apartment]" v-if="apartment"/>
                    <ContactForm :apartment="apartment"/>
                </div> 
            </div>
        </div>
    </div>
  
</template>





<style lang="scss" scoped>
.col-6{


    img{
        width: 100%;
        border-radius: 20px;

    
    }
    &:hover{
       

       img{
           filter: brightness(50%);
           transition: 1s;
       }

        
       
    }
    ul{
        list-style-type: none;

        // h2{
        //     border-bottom: 1px solid rgb(158, 152, 152);
        //     box-shadow: 5px 5px;
        // }
    }
    
}
    
</style>