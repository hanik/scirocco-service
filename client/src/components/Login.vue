// src/components/Login.vue
<template>
    <div>
        <h2>Log In</h2>
        <form @submit="onSubmit">
            <input placeholder="Enter your ID" v-model="uid">
            <input placeholder="Enter your password" v-model="password">
            <button type="submit">Login</button>
        </form>
        <div class="alert-danger" v-if="errorState"> <!-- errorState가 있으면 표시한다 -->
            <p></p>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex' // mapGetters를 추가한다

    export default {
        name: 'Login',
        data: () => ({
            uid: '',
            password: ''
        }),
        methods: {
            ...mapActions(['login']),
            async onSubmit () {
                try {
                    let loginResult = await this.login({uid: this.uid, password: this.password})
                    if (loginResult) this.goToPages() // 로그인 실패시 loginResult === false 이므로 goToPages 메소드는 실행되지 않는다.
                } catch (err) {
                    console.error(err)
                }
            },
            goToPages () {
                this.$router.push({
                    name: 'HelloWorld' // HelloWorld로 가자
                })
            }
        },
        computed: {
            ...mapGetters({
                errorState: 'getErrorState' // getter로 errorState를 받는다
            })
        }
    }
</script>

<style scoped>
    .alert-danger p{ // 색깔도 칠해준다. 경고의 빨간 맛
    color: red;
    }
</style>