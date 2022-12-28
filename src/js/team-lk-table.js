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
                isAccessAdd: false
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

                this.$refs.table.querySelectorAll('[data-team-access]:checked').forEach(element => {
                    element.checked = false
                });

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