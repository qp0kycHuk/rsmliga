<script setup>
import { SVG } from '@svgdotjs/svg.js'
import tippy from 'tippy.js';
import { inject, onMounted, ref, watch } from 'vue';
import getSupportedEvents from '../functions/getSupportedEvents'
import { scrollTo } from '../functions/'

const ASSETS_PART = window.ASSETS_PART || ''

let $root = ref(null)
let rootSVG
let activeItem
const { conference } = defineProps(['conference']);

const [activeConference, setActiveConference] = inject('useActiveConference')
const [activeArea, setActiveArea] = inject('useActiveArea')
const [activeSchool, setActiveSchool] = inject('useActiveSchool')


watch(activeConference, (newValue, oldValue) => {
    if (newValue && newValue.type != 'dot') {
        openConference(Object.values(conference).find((c) => c.id == newValue.id))
    }
})

watch(activeArea, (newValue, oldValue) => {
    oldValue?.instance?.node.classList.remove('active')

    if (!activeItem) return

    if (newValue) {
        Object.values(activeItem.areas)
            .find((a) => a.id == newValue.id)
            ?.instance.node.classList.add('active')
    }
})

onMounted(() => {
    rootSVG = SVG($root.value)

    // draw all conferences
    Object.entries(conference).forEach(drawConference)

    // draw titles text
    rootSVG
        .group()
        .attr({ class: 'conference-titles' })
        .image(ASSETS_PART + 'img/conference-titles.png')
        .size(969, 992)

})


function drawConference([key, item]) {
    const conferenceGroup = rootSVG.group()
    conferenceGroup.node.addEventListener('click', () => conferenceClickHandler(item))

    if (item.type == 'dot') {
        conferenceGroup.node.classList.add('conference-dot')

        conferenceGroup
            .circle()
            .attr({ cx: item.coords[0], cy: item.coords[1], r: 10, fill: '#C31844' })

        conferenceGroup
            .circle()
            .attr({ cx: item.coords[0], cy: item.coords[1], r: 5, fill: 'white' })

        tippy(conferenceGroup.node, createTooltipOpts({
            rating: item.rating,
            place: item.place,
            offset: 0
        }));

        return
    }

    conferenceGroup.node.classList.add('conference-group')

    const conferencePath = conferenceGroup.path(item.path)
    conferencePath.node.classList.add('conference-path')
    if (getSupportedEvents().type != 'touch') {
        tippy(conferencePath.node, createTooltipOpts({
            rating: item.rating,
            place: item.place,
            offset: conferencePath.height() / 3
        }));
    }


    // save initial size and position
    const rect = {
        width: conferencePath.width(),
        height: conferencePath.height(),
        x: conferencePath.x(),
        y: conferencePath.y(),
    }

    conferencePath.defaultRect = rect
    conferenceGroup.defaultRect = rect

    const areasGroup = conferenceGroup.group()
    Object.values(item.areas).forEach(area => {
        const areaPath = areasGroup.path(area.path)
        areaPath.node.classList.add('conference-area')
        area.instance = areaPath

        if (getSupportedEvents().type != 'touch') {
            tippy(areaPath.node, createTooltipOpts({
                rating: area.rating,
                place: area.place,
                offset: areaPath.height() * 0.8
            }));
        }

        areaPath.node.addEventListener('click', (event) => {
            changeActiveArea(area)
        })
    });



    if (item.sign) {
        conferenceGroup
            .image(ASSETS_PART + 'img/conference-titles-' + key + '.svg')
            .attr({ class: 'conference-area-titles' })
            .size(item.sign.width, item.sign.height)
            .move(item.sign.x, item.sign.y)
    }

    item.conferenceGroup = conferenceGroup
    item.conferencePath = conferencePath
    item.areasGroup = areasGroup
}


function changeActiveArea(area) {
    setActiveArea(area)
    setActiveSchool(null)

    scrollTo('#conference-' + activeItem.id)
}

function conferenceClickHandler(item) {
    if (!activeItem) {
        setActiveConference(item)

        if (item.type == 'dot') {
            scrollTo('#conference-' + item.id)
        }
    }

}

function openConference(item) {
    closeConference()
    activeItem = item
    setActiveConference(item)
    resizeToFull(item.conferenceGroup)
    item.conferenceGroup.node.classList.add('conference-group-active')
    $root.value.classList.add('conference-active')
}

function closeConference() {
    if (!activeItem) return
    resizeToDefault(activeItem.conferenceGroup)
    activeItem.conferenceGroup.node.classList.remove('conference-group-active')
    $root.value.classList.remove('conference-active')
    activeItem = null
    setActiveConference(null)
    setActiveArea(null)
    setActiveSchool(null)
}

function resizeToFull(instance) {
    const [pathWidth, pathHeight] = [instance.width(), instance.height()]
    const [rootWidth, rootHeight] = [rootSVG.width(), rootSVG.height()]

    let width = rootWidth
    let height = pathHeight * (rootWidth / pathWidth)

    if (height > rootHeight) {
        width = pathWidth * (rootHeight / pathHeight)
        height = rootHeight
    }

    const [x, y] = [rootWidth / 2 - width / 2, rootHeight / 2 - height / 2]

    instance.animate()
        .move(x, y)
        .size(width, height)
}

function resizeToDefault(instance) {
    instance.animate()
        .move(instance.defaultRect.x, instance.defaultRect.y)
        .size(
            instance.defaultRect.width,
            instance.defaultRect.height
        )
}

function createTooltipOpts({ rating, place, offset }) {
    return {
        content: `
        <div class="conference-tooltip">
            ${rating ? `<div class="flex">
                <img src="${ASSETS_PART}img/star.png" class="mr-1">
                <div className="text-small">Рейтинг: ${rating}</div>
            </div>` : ''}
            ${place ? `<div class="flex">
                <img src="${ASSETS_PART}img/trophy.png" class="mr-1">
                <div className="text-small">Место: ${place}</div>
            </div>` : ''}

        </div>
        `,
        // trigger: 'click',
        theme: 'light',
        animation: 'perspective',
        offset: [0, -1 * offset],
        allowHTML: true,

    }
}

</script>

<template>
    <div class="map-page__map card">
        <svg ref="$root" width="969" height="992" viewBox="0 0 969 992" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="map-page__map-svg conference-root" id="root-map">
        </svg>
        <div class="map-page__back">
            <button class="btn btn--primary btn--light w-100" @click="closeConference">
                <svg class="icon text-subtitle-2 mr-2">
                    <use :xlink:href="`${ASSETS_PART}/img/icons.svg#arrow-left`" />
                </svg>
                Вернуться на карту конференций
            </button>
        </div>
    </div>
</template>

<style>

</style>