<template>
  <div class="row-sm">
    <div v-if="customer.email !='admin@gmail.com'">
      <div class="shoppingCart">
        <getDropdownCart/>
      </div>
      <div class="profile">
        <profileNav/>
      </div>
    </div>
            <div class="mt-2 text">
                <div class="green-text">
                    <h4>{{customer.name.firstname}} {{customer.name.lastname}}</h4>
                    <div v-if="customer.email !='admin@gmail.com'">
            <button class="btn delete-btn" variant="primary" v-on:click="deleteCustomer()">Delete Account</button>
          </div>
          </div>
            <!-- Personal Info -->
    <ul class="list-group my-info">
      <h6 class="list-group-item">PERSONAL INFORMATION <button class="btn edit-btn" variant="primary" v-on:click="enableInput(), update=true">Edit</button></h6>
      <h6 class="list-group-item">First name <input type="text" class="form-control" disabled v-model="firstname" :placeholder="customer.name.firstname" /></h6>
      <h6 class="list-group-item">Last name <input type="text" class="form-control" disabled v-model="lastname" :placeholder="customer.name.lastname" /></h6>
      <h6 class="list-group-item">Personal number <input type="text" class="form-control" disabled v-model="personalNumber" :placeholder="customer.personalNumber" /></h6>
      <h6 class="list-group-item">Phone number <input type="text" class="form-control" disabled v-model="phone" :placeholder="customer.phone" /></h6>
      <h6 class="list-group-item">Address <input type="text" class="form-control" disabled v-model="address" :placeholder="customer.adress" /></h6>
      <h6 class="list-group-item">Username <input type="text" class="form-control" disabled v-model="username" :placeholder="customer.account.username" /></h6>
      <h6 class="list-group-item">Email <input type="email" class="form-control" disabled v-model="email" :placeholder="customer.email" /></h6>
      <h6 class="list-group-item">Password <input type="password" class="form-control" disabled v-model="password" placeholder="*********" /></h6>
      <div class="buttons" v-if="update">
        <button class="btn btn-danger mt-1" variant="primary" v-on:click="update=false, cancel()">Cancel</button>
      <button class="btn ml-2 mt-1" variant="primary" v-on:click="updateProfile(), update=false">Update</button>
      </div>
    </ul>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import getDropdownCart from '../components/getDropdownCart.vue'
import profileNav from '../components/profileNav.vue'

export default {
  name: 'myInfo',
  components: { profileNav, getDropdownCart },
  mounted() {
    const jwttoken = {
      token: sessionStorage.getItem('token')
    }
    let host = window.location.origin
    if (host === 'https://group20-ecoshop.herokuapp.com') {
      host = '/'
    } else {
      host = 'http://localhost:3000/'
    }
    console.log(host)
    fetch(`${host}customer`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Host: '',
        token: jwttoken.token
      }
    }).then((response) => {
      if (response.status === 401) {
        this.$bvModal.msgBoxOk('Unauthorized. Please log in again')
        sessionStorage.setItem('token', null)
        this.$router.push('/signIn')
      } else {
        return response.json()
      }
    }).then((responseData) => {
      this.customer = responseData
    }).catch(function (err) {
      console.log(err)
    })
  },
  data() {
    return {
      customer: {},
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
      error: '',
      update: false
    }
  },
  methods: {
    deleteCustomer() {
      if (confirm('Are you certain that you want to delete your account? This action cannot be undone.')) {
        Api.delete(`/customers/${this.customer._id}`)
          .then((res) => {
            sessionStorage.clear()
            console.log(res)
            this.$bvModal.msgBoxOk('Account deleted')
          }).catch((error) => {
            console.log(error)
          })
        this.$router.push('/signUp')
      }
    },
    enableInput() {
      const n = document.getElementsByClassName('form-control')
      for (let i = 0; i < n.length; i++) {
        n[i].disabled = false
      }
    },
    updateProfile() {
      const updateCustomer = {
        name: {
          firstname: this.firstname || this.customer.name.firstname,
          lastname: this.lastname || this.customer.name.lastname
        },
        account: {
          username: this.username || this.customer.account.username,
          password: this.password || this.customer.account.password
        },
        email: this.email || this.customer.email,
        phone: this.phone || this.customer.phone,
        personalNumber: this.personalNumber || this.customer.personalNumber,
        adress: this.adress || this.customer.adress
      }
      Api.put(`/customers/${this.customer._id}`, updateCustomer).then(
        res => {
          console.log(res)
          this.$bvModal.msgBoxOk('Account updated')
        },
        (err) => {
          console.log(err.response)
        }
      ).catch(error => {
        console.error(error)
      })
      location.reload()
    },
    cancel() {
      location.reload()
    }
  }
}
</script>

<style>
.green-text{
        font-weight: 100;
    }

.button {
background-color: #99ae71;
border: none;
color: white;
padding: 20px;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 4px 2px;
border-radius: 12px;
display: block;
margin-left: auto;
margin-right: auto;
}

.button-1{
margin-left: auto;
margin-right: auto;
display: inline-block;
}

.button-2{
margin-left: auto;
margin-right: auto;
display: inline-block;
}

.btn{
text-align: center !important;
min-width: 50px !important;
}

.edit-btn{
  width: auto !important;
  font-size: auto !important;
  float: right;
  color: white !important;
}

.delete-btn{
  width: auto !important;
  font-size: auto !important;
  background-color: rgb(165, 17, 17) !important;
  margin-bottom: 10px;
  color: white !important;
}

.text{
align-items: center;
margin-left: 3rem;
margin-right: 3rem;
margin-bottom: 3rem;
}

.my-info{
    width: 100%;
}
.list-group{
  width: 100%;
}
.row{
  width: auto;
}
.shoppingCart{
  margin-bottom: 30px;
}

@media (min-device-width: 360px) and (max-device-height: 768px){
  .text{
  width: 80% !important;
}
.list-group{
  width: 100% !important;
}

}

</style>
