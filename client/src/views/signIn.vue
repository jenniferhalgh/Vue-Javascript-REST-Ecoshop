<template>
  <div class="form-group">
    <form @submit.prevent="handleSubmit">
        <h6> LOG IN </h6>
        <br>
        <div>
        <input type="email" class="form-control" v-model="email" placeholder="Email address" />
        </div>
        <br>
        <div>
        <input type="password" class="form-control" v-model="password" placeholder="Password" />
        </div>
        <br>
        <button type="submit" class="btn btn-block">LOG IN</button>
        <br>
        <p>Need an account?</p>
        <router-link class="link" to="/signUp">
        Sign up
      </router-link>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'signIn',
  data() {
    return {
      customerData: {
        email: ' ',
        password: ' ',
        _id: '',
        error: ' '
      }
    }
  },
  methods: {
    handleSubmit() {
      const customer = {
        email: this.email,
        password: this.password
      }
      Api.post('/customers/login', customer).then((res) => {
        sessionStorage.setItem('token', res.data.token)
        this.$bvModal.msgBoxOk('Successfully logged in')
        this.$router.push('/')
        location.reload()
      },
      (err) => {
        console.log(err.response)
        this.error = err.response.data.error
        this.$bvModal.msgBoxOk(this.error)
      })
    }
  }
}

</script>

<style>
button{
  background: #99ae71 !important;
  border: none !important;
  width: 310px;
}

h6{
  text-align: left;
}

form{
  padding: 20px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

.form-group{
 margin-top: 100px
}

p{
  color: #000;
}

.link{
  color: rgb(108, 196, 255);
}

hr {margin-left: auto;margin-right: auto;height: 100px;background-color:#666; opacity: 0.5;}

@media (min-width: 360px) and (max-device-height: 768px){
}

</style>
