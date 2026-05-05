<script setup lang="ts">
import {Navbar} from '@/widgets/navbar/index';
import {Footer} from '@/widgets/footer/index';
</script>

<template>
    <div class="page">
        <Navbar/>
            content
        <Footer/>
    </div>
</template>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
}

</style>
