<script setup>
import { inject } from 'vue';
import AreaButton from './AreaButton.vue';

const ASSETS_PART = window.ASSETS_PART || ''
const { item } = defineProps(['item'])

const [activeConference, setActiveConference] = inject('useActiveConference')
const [activeArea, setActiveArea] = inject('useActiveArea')
const [activeSchool, setActiveSchool] = inject('useActiveSchool')


function changeActiveArea(area) {
    setActiveArea(area)
    setActiveSchool(null)
}
</script>

<template>
    <div class="map-page-item mb-4" @click="setActiveConference(item)" :id="'conference-' + item.id">
        <div class="map-page-item__button">
            <div class="text-body-2 text--demibold text-md-h6">{{ item.title }}</div>
            <div class="flex flex-align-center ml-2 ml-sm-4 mr-auto">
                <svg class="icon mr-1 color-yellow">
                    <use :xlink:href="`${ASSETS_PART}/img/icons.svg#star`" />
                </svg>
                <div class="text-small text-sm-body-1">{{ item.rating }}</div>
            </div>
            <svg class="icon text-sm-subtitle-1 color-primary ml-3">
                <use :xlink:href="`${ASSETS_PART}/img/icons.svg#triangle-right`" />
            </svg>
        </div>
        <div class="map-page-item__content" v-if="item.id == activeConference?.id">
            <div class="map-page-item__inner">
                <div class="grid">
                    <div class="grid-col-lg-3 map-page-item__inner-col" :class="[activeArea ? 'd-none d-lg-block' : '']">
                        <div class="text-body-1 text-sm-body-0 text--demibold mb-4">Выберите район</div>

                        <AreaButton 
                            v-for="area in item.areas" 
                            :item="area" 
                            :class="[activeArea?.id == area?.id ? 'active' : '']"
                            @click="changeActiveArea(area)"></AreaButton>

                    </div>
                    <div class="grid-col-lg-4 map-page-item__inner-col" :class="[activeSchool ? 'd-none d-lg-block' : '']" v-if="activeArea" >
                        <button class="d-lg-none btn btn--primary btn--light btn-small mb-3" @click="setActiveArea(null)">
                            <svg class="icon "><use :xlink:href="`${ASSETS_PART}/img/icons.svg#arrow-left`" /></svg>
                        </button>
                        <div v-for="schools in activeArea.schools">
                            <div class="text-body-1 text-sm-body-0 text--demibold mb-4 flex flex-align-center">
                                {{ schools.title }}
                            </div>
                            
                            <AreaButton 
                                v-for="school in schools.items" 
                                :item="school"
                                :class="[activeSchool?.id == school?.id ? 'active' : '']"
                                @click="setActiveSchool(school)" ></AreaButton>
                        </div>

                    </div>
                    <div class="grid-col-lg-5 map-page-item__inner-col" :class="['']" v-if="activeSchool">
                        <button class="d-lg-none btn btn--primary btn--light btn-small mb-3" @click="setActiveSchool(null)">
                            <svg class="icon "><use :xlink:href="`${ASSETS_PART}/img/icons.svg#arrow-left`" /></svg>
                        </button>
                        <div v-for="teams in activeSchool.teams">
                            <div class="text-body-1 text-sm-body-0 text--demibold mb-4 flex flex-align-center">
                                {{ teams.title }}
                            </div>
                            
                            <AreaButton 
                                data-fancybox-modal 
                                data-src="https://sun9-40.userapi.com/impg/bK89vbwFYbOyGdp3XtH3PhCESUsq5L0xL4tO0A/yDZHQLpHMP8.jpg?size=1600x737&quality=95&sign=fabb1127eb275a76127ea5e3c44341d5&type=album" 
                                :item="team" 
                                v-for="team in teams.items"></AreaButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>