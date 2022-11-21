const Vue = require('vue/dist/vue.esm-bundler');
import { SVG } from '@svgdotjs/svg.js'
import { conference as conferenceData } from '../data/conference-map';
import tippy from 'tippy.js';
import { mergeDeep } from '../functions';
import RootComponent from './App.vue'

let $root
let rootSVG
let activeConference
let conference;

let app

function init() {
    app = Vue.createApp({
        components: { RootComponent },
        template: '<RootComponent></RootComponent>'
    })
    app.mount('#conference-map')

    conference = mergeDeep(conferenceData, window.conferenceData || {})


    $root = document.getElementById('root-map')
    $root.classList.add('conference-root')
    rootSVG = SVG($root)

    // draw all conferences
    Object.entries(conference).forEach(([key, item]) => {
        const conferenceGroup = rootSVG.group()
        if (item.type == 'dot') {
            conferenceGroup.node.classList.add('conference-dot')

            conferenceGroup.circle()
                .attr({ cx: item.coords[0], cy: item.coords[1], r: 10, fill: '#C31844' })

            conferenceGroup.circle()
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
        tippy(conferencePath.node, createTooltipOpts({
            rating: item.rating,
            place: item.place,
            offset: conferencePath.height() / 3
        }));

        const areasGroup = conferenceGroup.group()

        // save initial size and position
        const rect = {
            width: conferencePath.width(),
            height: conferencePath.height(),
            x: conferencePath.x(),
            y: conferencePath.y(),
        }

        conferencePath.defaultRect = rect
        areasGroup.defaultRect = rect
        conferenceGroup.defaultRect = rect

        item.areas.forEach(area => {
            const areaPath = areasGroup.path(area.path)
            areaPath.node.classList.add('conference-area')
            area.instance = areaPath

            tippy(areaPath.node, createTooltipOpts({
                rating: area.rating,
                place: area.place,
                offset: areaPath.height() * 0.8
            }));
        });



        conferenceGroup.node.addEventListener('click', () => conferenceClickHandler(item))

        if (item.sign) {
            conferenceGroup
                .image(window.ASSETS_PART + 'img/conference-titles-' + key + '.svg')
                .attr({ class: 'conference-area-titles' })
                .size(item.sign.width, item.sign.height)
                .move(item.sign.x, item.sign.y)
        }


        item.conferenceGroup = conferenceGroup
        item.conferencePath = conferencePath
        item.areasGroup = areasGroup
    })

    // draw titles text
    rootSVG
        .group()
        .attr({ class: 'conference-titles' })
        .image(window.ASSETS_PART + 'img/conference-titles.png')
        .size(969, 992)



    document.addEventListener('click', docClickHandler)
}



export default { init }