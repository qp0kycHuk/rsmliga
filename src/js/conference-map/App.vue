<script setup>
import MapComponent from './Map.vue';
import ItemComponent from './Item.vue';
import DescriptionComponent from './Description.vue';
import { conference as conferenceData } from '../data/conference-map';
import { mergeDeep } from '../functions';
import { useState } from '../hooks-vue/useState';
import { provide } from 'vue';

const conference = mergeDeep(conferenceData, window.conferenceData || {})

const [activeConference, setActiveConference] = useState(null)
const [activeArea, setActiveArea] = useState(null)
const [activeSchool, setActiveSchool] = useState(null)

provide('useActiveConference', [activeConference, setActiveConference])
provide('useActiveArea', [activeArea, setActiveArea])
provide('useActiveSchool', [activeSchool, setActiveSchool])

</script>

<template>
    <MapComponent :conference="conference"></MapComponent>


    <div class="map-page__items">
        <ItemComponent v-for="item in conference" :item="item"></ItemComponent>
    </div>

    <DescriptionComponent v-if="activeArea"></DescriptionComponent>
</template>

<style>

</style>