import { reactive } from 'vue'

export const store = reactive({
    //api urls
    apartmensUrl: 'http://localhost:8000',

    // array that is going to be popolated from api 
    apartments: [],

    // extras
    loading: true,
});
