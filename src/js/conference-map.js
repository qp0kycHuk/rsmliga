import { SVG } from '@svgdotjs/svg.js'
import { conference as conferenceData } from './data/conference-map';
import tippy from 'tippy.js';
import { mergeDeep } from './functions';

let $root
let rootSVG
let activeConference
let conference;


function init() {
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

function conferenceClickHandler(item) {
    if (!activeConference) {
        openConference(item)
    }
}

function openConference(item) {
    activeConference = item
    resizeToFull(item.conferenceGroup)
    item.conferenceGroup.node.classList.add('conference-group-active')
    $root.classList.add('conference-active')
}

function closeConference() {
    resizeToDefault(activeConference.conferenceGroup)
    activeConference.conferenceGroup.node.classList.remove('conference-group-active')
    $root.classList.remove('conference-active')
    activeConference = null
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
                <img src="${window.ASSETS_PART}img/star.png" class="mr-1">
                <div className="text-small">Рейтинг: ${rating}</div>
            </div>` : ''}
            ${place ? `<div class="flex">
                <img src="${window.ASSETS_PART}img/trophy.png" class="mr-1">
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

function docClickHandler(event) {
    if (event.target.closest('[data-close-conference]')) {
        closeConference()
    }
}

export default { init }