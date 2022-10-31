<template>
  <div>
    <h1>로그인</h1>
    <div class="form-group">
      <label for="user_id" class="col-sm-2 control-label">아이디</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" placeholder="ID" ref="user_id" v-model="user_id">
      </div>
    </div>
    <div class="form-group">
      <label for="user_pw" class="col-sm-2 control-label">패스워드</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" placeholder="Password" ref="user_pw" v-model="user_pw">
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button @click="login" class="btn btn-default">Log in</button>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <a href="/api/oauth2/authorization/google" class="btn btn-default">Log in by Google</a>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      user_id: '',
      user_pw: ''
    }
  },
  methods: {
    ...mapActions(['login', 'loginBySocial']), // vuex/actions에 있는 login 함수
    async fnLogin () { // async 함수로 변경
      if (this.user_id === '') {
        alert('ID를 입력하세요.')
        this.$refs.user_id.focus()
        return
      }

      if (this.user_pw === '') {
        alert('비밀번호를 입력하세요.')
        this.$refs.user_pw.focus()
        return
      }

      const params = {
        uid: this.user_id,
        pass: this.user_pw
      }
      this.login(params).then((res) => {
      }).catch()
    }
  },
  computed: {
    ...mapGetters(['getToken'])
  }
}
</script>

<style>
#loginForm {
  width: 500px;
  margin: auto;
}
</style>
