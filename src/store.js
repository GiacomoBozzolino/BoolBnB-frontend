import { reactive } from 'vue'

export const store = reactive({
    //appi urls
    apartmensUrl: 'http://localhost:8000',



    // aray that is going to be popolated from api 
    apartments: [],

    // extras
    loading: true,
});
