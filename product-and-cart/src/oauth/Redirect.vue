<template lang="ko">
</template>

<script>
import { mapActions } from 'vuex'
// import { useRoute } from 'vue-router'

export default {
  created () {
    const token = this.$route.query.token
    const refresh = this.$route.query.refresh
    this.loginToken({ refreshToken: refresh, accessToken: token })
  },
  methods: {
    ...mapActions(['loginToken'])
  }
}
</script>
