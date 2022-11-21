<script setup>
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
</script>

<template>
    <div class="map-page__map card">
        <svg width="969" height="992" viewBox="0 0 969 992" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="map-page__map-svg" id="root-map">

        </svg>
        <div class="map-page__back">
            <button class="btn btn--primary btn--light" data-close-conference>
                <svg class="icon text-subtitle-2 mr-2">
                    <use xlink:href="img/icons.svg#arrow-left" />
                </svg>
                Вернуться на карту конференций
            </button>
        </div>
    </div>
</template>

<style>

</style>