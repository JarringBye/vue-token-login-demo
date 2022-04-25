<template>
  <div id=login-father>
    <div id="login-container">
      <div class="login-left">
        <img src="../../public/loginpic.svg" alt="loginpic">
      </div>
      <div class="login-right">
        <div class="login-title">
          <p>登录｜LogIn</p>
        </div>
        <div class="login-input">
          <p>
            <span style="font-weight:bold">账号  </span>
            <input type="text" class="input-ele" v-model="account">
          </p>
          <p>
            <span style="font-weight:bold">密码  </span>
            <input type="password" class="input-ele" v-model="password">
          </p>
          <button @click="login" :disabled='!this.hasInput'>登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginHome',
  data: function () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login () { // 发送登录请求
      const config = {
        url: '/apis/login',
        method: 'POST',
        data: {
          account: this.account,
          password: this.password
        }
      }
      this.$axios(config).then((res) => { // 接收响应token保存到本地
        localStorage.setItem('token', res.data)
        this.$router.push('/user') // 表明登录成功，跳转到user页面
      }).catch(err => err)
    }
  },
  computed: {
    hasInput () {
      return Boolean(this.account && this.password)
    }
  }
}

</script>

<style scoped>
/*p {*/
/*  margin: 0;*/
/*}*/
#login-father {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center
}

#login-container {
  width: 800px;
  height: 500px;
  /*background-color: pink;*/
  border-radius: 2%;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  /*box-shadow: 3px 3px 1px rgba(62,180,144,0.5) ;*/
}

.login-left {
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  /*background-color: pink*/
}

.login-right {
  width: 400px;
  height: 400px;
  /*background-color: blue;*/
  overflow: hidden
}

.login-title {
  font-size: 30px;
  font-weight: bold;
  width: 400px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-title > p {
  width: 200px;
  height: 50px;
}

.login-input {
  width: 400px;
  height: 250px;
}

.login-input p {
  margin-top: 50px;
}

.input-ele {
  width: 200px;
  height: 30px;
  border: solid;
  border-radius: 5px;
  font-size: 18px;
}

img {
  width: 300px;
  height: 300px;
  display: block;
}

.login-input button {
  width: 100px;
  height: 40px;
  display: block;
  margin-left: 120px;
  margin-top: 20px;
  color: inherit;
  border: solid;
  border-radius: 5px;
  font-weight: bold;
}

button:disabled {
  color: inherit;
  opacity: 0.8;
  cursor: not-allowed;
}

</style>
