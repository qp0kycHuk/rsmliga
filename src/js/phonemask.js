const phoneRegexp = /(7|8)?(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/
const phoneCompleteRegexp = /(7|8)\d{10}$/

export function getUnmaskedValue(value) {
    return value.replace(/\D/g, '')
}

export function getMaskedValue(value) {
    const numberValue = value.toString().replace(/\D/g, '')

    if (!numberValue) {
        return ''
    }

    const matchValue = numberValue.match(phoneRegexp);

    if (!matchValue) {
        return ''
    }

    const a = matchValue[2];
    const b = matchValue[3];
    const c = matchValue[4];
    const d = matchValue[5];
    // +7 (aaa) bbb - cc - dd
    const maskedValue = `+7${a ? ` (${a}` : ''}${b ? `) ${b}` : ''}${c ? ` - ${c}` : ''}${d ? ` - ${d}` : ''}`;

    return maskedValue
}

export function isComplete(value) {
    const numberValue = value.replace(/\D/g, '')
    console.log(numberValue);

    return phoneCompleteRegexp.test(numberValue)
}


function init(selector) {
    document.addEventListener('input', (event) => {
        if (!event.target.matches(selector)) return
        const maskedValue = getMaskedValue(event.target.value)
        event.target.value = maskedValue

        event.target.addEventListener('blur', (event) => {
            if (!isComplete(event.target.value)) {
                event.target.value = ''
            }
        }, { once: true })
    })


}

export default { init }