<script setup>
import { inject } from 'vue';
const ASSETS_PART = window.ASSETS_PART || ''
const [activeArea, setActiveArea] = inject('useActiveArea')

</script>

<template>
    <div class="card mt-10 px-4 py-7 px-sm-7">
        <div class="text-h6 mb-5">{{ activeArea.title }}</div>
        <div class="text-body-2">
            {{ activeArea.description.text }}
        </div>
        <div class="mt-5"></div>
        <div class="grid grid-spacing-5">
            <div class="grid-col-6 grid-col-md-3" v-for="img in activeArea.description.gallery">
                <a :href="img.src" :data-fancybox="activeArea.id" class="image image--box bg-l2">
                    <img :src="img.src" alt="">
                    <div class="video-card-btn" v-if="img.type == 'video'">
                        <img :src="`${ASSETS_PART}/img/sempl/youtube-btn.svg`" alt="">
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<style>

</style>