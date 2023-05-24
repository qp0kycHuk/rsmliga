const Vue = require('vue/dist/vue.esm-bundler');

function init() {
    if (!document.querySelector('#team-root')) {
        return
    }
    const localContest = localStorage.getItem('currentContest') ? JSON.parse(localStorage.getItem('currentContest')) : null

    const app = Vue.createApp({
        data() {
            return {
                selected: [],
                contests: window.contests || [],
                currentContest: localContest || window.currentContest || window.contests[0],
                isAccessCheck: false,
                isAccessAdd: false,
                members: window.members || {}

            }
        },
        watch: {
            isAccessCheck() {
                this.$refs.table.querySelectorAll('[data-team-access]:not(:checked)').forEach(element => {
                    element.disabled = !this.isAccessCheck
                });
            }
        },
        mounted() {
            this.isAccessCheck = this.getAccessCheck()

        },
        methods: {
            changeHandler(event) {
                this.isAccessCheck = this.getAccessCheck()
                this.isAccessAdd = this.getAccessAdd()

            },
            contestChangeHandler(event) {
                const id = event.target.value
                const contest = this.contests.find((c) => c.id.toString() === id.toString())
                this.currentContest = contest
                localStorage.setItem('currentContest', JSON.stringify(contest))

                const checkboxes = this.$refs.table.querySelectorAll('[data-team-access]:checked')

                if ((checkboxes.length - contest.max) > 0) {
                    for (let i = 0; i < (checkboxes.length - contest.max); i++) {
                        const element = checkboxes[checkboxes.length - i - 1];
                        element.checked = false
                    }
                }

                this.isAccessCheck = this.getAccessCheck()
                this.isAccessAdd = this.getAccessAdd()

            },
            getAccessAdd() {
                if (this.$refs.table) {
                    return this.$refs.table.querySelectorAll('[data-team-access]:checked').length == this.currentContest.max
                } else {
                    return false
                }
            },
            getAccessCheck() {
                if (this.$refs.table) {
                    return this.$refs.table.querySelectorAll('[data-team-access]:checked').length < this.currentContest.max
                } else {
                    return true
                }
            }
        }
    })
    app.mount('#team-root')
}

export default { init }