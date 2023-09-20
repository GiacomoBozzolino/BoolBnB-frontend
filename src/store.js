import { reactive } from 'vue'

export const store = reactive({
    //api urls
    apartmensUrl: 'http://localhost:8000',

    // array that is going to be popolated from api 
    // apartments riempie axios di homepage
    apartments: [],
    // dati per il search
    searchApartments: '',
    apartmentsSearch: [],
    // extras
    loading: true,
});
