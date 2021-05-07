<template>
    <div>
        <h1>Home</h1>
        <h2>Bienvenido : - {{ user.name }}</h2>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Home',
    computed: {
        ...mapState(['user'])
    }
}
</script>

<style>

</style>