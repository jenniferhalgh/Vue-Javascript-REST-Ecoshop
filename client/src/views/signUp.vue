<template>
  <div class="form-group">
    <form @submit.prevent="handleSubmit">
      <h6> SIGN UP </h6>
      <br>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" v-model="firstname" placeholder="First name" />
          </div>
          <div class="col">
            <input type="text" class="form-control" v-model="lastname" placeholder="Last name" />
          </div>
        </div>
        <br>
        <div>
          <input type="text" class="form-control" v-model="username" placeholder="Username" />
        </div>
        <br>
        <div>
          <input type="password" class="form-control" v-model="password" placeholder="Password" />
        </div>
        <br>
        <div>
          <input type="text" class="form-control" v-model="personalNumber" placeholder="Personal number" />
        </div>
        <br>
        <div>
          <input type="email" class="form-control" v-model="email" placeholder="Email" />
        </div>
        <br>
        <div>
          <input type="text" class="form-control" v-model="phone" placeholder="Phone number" />
        </div>
        <br>
        <div>
          <input type="text" class="form-control" v-model="adress" placeholder="Address" />
        </div>
        <br>
        <button type="submit" class="btn btn-block">CREATE ACCOUNT</button>
        <br>
        <p>Already have an account?</p>
         <router-link class="link" to="/signIn">
           Log in
        </router-link>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'signUp',
  components: { },
  data() {
    return {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      personalNumber: '',
      email: '',
      phone: '',
      adress: '',
      shoppingCart: null,
      paymentInfos: [],
      orders: [],
      token: '',
      error: ''
    }
  },
  methods: {
    handleSubmit() {
      const newCustomer = {
        name: {
          firstname: this.firstname,
          lastname: this.lastname
        },
        account: {
          username: this.username,
          password: this.password
        },
        email: this.email,
        phone: this.phone,
        personalNumber: this.personalNumber,
        adress: this.adress,
        shoppingCart: this.shoppingCart,
        paymentInfo: [],
        orders: [],
        token: ''
      }
      Api.post('/customers', newCustomer).then((res) => {
        console.log(res)
        this.$router.push('/signIn')
        sessionStorage.setItem('token', res.data.token)
      },
      (err) => {
        console.log(err.response)
        this.boxOne = ''
        this.error = err.response.data.error
        this.$bvModal.msgBoxOk(this.error)
      }
      )
    }
  }
}
</script>

<style>
b-button{
  background: #99ae71 !important;
  border: none !important;
}
h1{
  text-align: center;
}

form{
  width: 70%;
  text-align: center;
  margin: 0 auto;
}

.adj{
  width: 50%;
}

.center2{
    height: 100px;
    width: 700px;
    position: absolute;
    top:0;
    bottom: 60% !important;
    left: 0;
    right: 0;
    margin: auto;
}

@media (min-width: 360px) and (max-device-height: 768px){
  .center2{
    top: 10% !important;
    width: auto;
    margin-left: auto;
    margin-right: auto;
    bottom: auto !important;
  }

  .btn{
    width: 100% !important;
  }
}

</style>
