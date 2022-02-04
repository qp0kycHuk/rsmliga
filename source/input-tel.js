window.addEventListener("DOMContentLoaded", function () {
    function mask(event) {
        var matrix = "+7 (___) ___ - __ - __",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = event.target.value.replace(/\D/g, "");
        if (def.length >= val.length) val = def;
        event.target.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });

        if (event.target.value[4] == "7" || event.target.value[4] == "8") {
            event.target.value = "";
        }

        event.target.addEventListener('blur', () => {
            if (event.target.value.length == 2) {
                event.target.value = "";
            }
        });
    };

    document.addEventListener('input', (event) => {
        if (event.target.getAttribute('type') == "tel") {
            mask(event);
        }
    });
});