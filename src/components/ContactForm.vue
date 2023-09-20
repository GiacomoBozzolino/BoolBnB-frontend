<!-- JAVASCRIPT & VUE.JS -->
<script>
import { store } from '../store';

import axios from 'axios';

export default {
    name:'ContactForm',
    components: {

    },
    data() {
        return {
            store,
           
            name: '',
            email: '',
            content: '',
            errors: {},
        }
    },
    methods: {
        sendForm() {

          

            // SALVO I DATI DI INPUT DELL'UTENTE
            const form_data = {
                name: this.name,
                email: this.email,
                content: this.content,

            };

            // SVUOTO L'OGGETTO CONTENTE I MESSAGGI DI ERRORE
            this.errors = {};

            // EFFETTUIAMO LA CHIAMATA AXIOS IN POST
            axios.post(`${this.store.apartmentsUrl}/api/contacts`, form_data).then((response) => {

                if (response.data.success) {
                    // RIPULISCO I DATI DI INPUT
                    this.name = '';
                    this.email = '';
                    this.content = '';
                    this.loading = false;
                    this.$router.push({ name: 'thank-you' });

                } else {

                    // SALVO I MESSAGGI DI ERRORE NELL'OGGETTO ERRORS
                    this.errors = response.data.errors;
                    this.loading = false;
                }
            });
        }
    },
}
</script>


<template lang="">
    <!-- CONTACT FORM CARD -->
    <div class="col-12 card border-black my-5">
        <div class="row p-5">
            <!-- CONTACT FORM TITLE -->
            <div class="col-12">
                <h2 class="text-center">Contattaci</h2>
            </div>
            <!-- CONTACT FORM LAYOUT -->
            <div class="col-12">
                <form @submit.prevent="sendForm()" class="row">
                    <!-- NAME FORM GROUP -->
                    <div class="col-12 col-md-6 my-3">
                        <label class="control-label">Nome e Cognome</label>
                        <!-- NAME INPUT -->
                        <input type="text" name="name" id="name" placeholder="Inserisci il tuo nome ed il tuo cognome" v-model="name" class="form-control" :class="errors.name ? 'is-invalid' : ''" required>
                        <!-- NAME ERRORS -->
                        <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{ error }}</span>
                    </div>
                    <!-- EMAIL FORM GROUP -->
                    <div class="col-12 col-md-6 my-3">
                        <label class="control-label">Email</label>
                        <!-- EMAIL INPUT -->
                        <input type="email" name="email" id="email" placeholder="Inserisci la tua email" v-model="email" class="form-control" :class="errors.email ? 'is-invalid' : ''" required>
                        <!-- EMAIL ERRORS -->
                        <span v-for="(error, index) in errors.email" :key="index" class="text-danger">{{ error }}</span>
                    </div>
                    <!-- CONTENT FORM GROUP -->
                    <div class="col-12 my-3">
                        <label class="control-label">Contenuto</label>
                        <!-- CONTENT TEXT AREA -->
                        <textarea name="content" id="content" placeholder="Inserisci il messaggio" v-model="content" class="form-control" :class="errors.content ? 'is-invalid' : ''" cols="30" rows="10" required></textarea>
                        <!-- CONTENT ERRORS -->
                        <span v-for="(error, index) in errors.content" :key="index" class="text-danger">{{ error }}</span>
                    </div>
                    <!-- FORM SUBMIT -->
                    <div class="col-12 text-center my-3">
                        <!-- SUBMIT BUTTON -->
                        <button type="submit" class="btn btn-success" :disabled="loading">{{ loading ? 'Invio email in corso' : 'Invia' }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
@use '../styles/generals.scss' as *;
</style>