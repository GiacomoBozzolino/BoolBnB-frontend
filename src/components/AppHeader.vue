<script>

export default {
    name: 'AppHeader',

    data() {
        return {
            menuItems: [
                {
                    label: 'Home',
                    routeName: 'Home'
                },
                {
                    label: 'Chi siamo',
                    routeName: 'AboutUs'
                },
     

            ]
        }
    },


}

</script>

<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light nav-background shadow-sm fixed z-3">
            <div class="container">
                <div class="row d-flex align-items-center justify-content-between w-100">

                    <!-- Left side nav bar -->
                    <div class="col-4">
                        <router-link class="navbar-brand d-flex align-items-center transition-logo" :to="{ name: 'Home' }">
                            <div class="logo-laravel">
                                <h2 class="logo p-4 rounded-5 shadow-lg"><i class="fa-solid fa-earth-europe"></i>BoolBnB
                                </h2>
                            </div>
                        </router-link>
                    </div>

                    <!-- Right side navbar -->
                    <div class="col-8 d-flex align-items-center justify-content-end">
                        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon">sdlkfgnsekliofsekflmn</span>
                        </button> -->
                        <ul class="navbar-nav">
                            <li class="nav-item " v-for="(item, index) in menuItems" :key="index">
                                <router-link class="nav-link fs-4 fw-semibold link-hover-header px-3 py-2 rounded-5" :to="{ name: item.routeName }">
                                    {{ item.label }}
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <a href="http://127.0.0.1:8000/" class="nav-link fs-4 fw-semibold link-hover-header px-3 py-2 rounded-5" >Diventa Host</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>


<style lang="scss" scoped>
.logo {
    color: #000000;
    transition: background-color 1s;
}

.logo:hover {
    background-color: #F6FEAA;
    color: black;
}

.link-hover-header {
    color: #000000;
}

.link-hover-header:hover {
    // background-color: #DFBE99;
    background-color: #F6FEAA;
}

.nav-background {
    background-color: #C5ADC5;
}

.drop-down:hover {
    background-color: rgb(206, 227, 245);
}

.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
</style>