<script setup>
const ASSETS_PART = window.ASSETS_PART || ''
const { item } = defineProps(['item'])
</script>

<template>
    <button class="map-page-item__area btn w-100">
        <div class="text-body-2">{{ item.title }}</div>
        <div class="flex flex-align-center ml-auto">
            <svg class="icon mr-1 color-yellow">
                <use :xlink:href="`${ASSETS_PART}/img/icons.svg#star`" />
            </svg>
            <div class="text-small lh-1 text--nowrap">{{ item.rating }}</div>
        </div>
    </button>
</template>

<style>

</style>