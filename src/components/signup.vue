<template>
  <div id="totalrap">
   
    <form @submit.prevent="login">
        <h3>Sign up Here</h3>
       <div style="color:red" v-text="error"></div>
        <label for="password">Name</label>
        <input type="text" placeholder="Full Name" v-model="form.name" name="name">
        <small style="color:red" v-text="validation.name"></small>

        <label for="username">Email</label>
        <input type="email" placeholder="Email Address" v-model="form.email" name="email" >
        <small style="color:red" v-text="validation.email"></small>

        <label for="password">Password</label>
        <input type="password" placeholder="New Password" v-model="form.password" name="password">
        <small style="color:red" v-text="validation.password"></small>
       
        
        <button type="submit" :class="isActive ? 'btn-warning' : ''" :disabled="isActive">
            <span v-if="isActive">Loading..</span> <span v-else>Sign Up</span>
        </button>
        <button type="button" class="btn-danger" @click="goback" style="font-size:18px">Go Back</button>
        
    </form>
    </div>
</template>
<script>
export default {
    name: "signup",
    data() {
        return {
            isActive: false,
            form: {
                name:'',
                email: '',
                password: ''
            },
            validation:[]
        }
    },
    mounted() {
        if(!localStorage.getItem("user")){
            this.$router.push('/')
        }
    },
    methods: {
        login(){
            this.isActive = true
            if (this.form.name && this.form.email && this.form.password) {
                 this.axios.post("add-user",this.form).then((response)=>{
                    //redairect to home
                     this.$router.push('/user')
                    //Sweet alert message
                    const Toast = this.$swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                        toast.addEventListener('mouseenter', this.$swal.stopTimer)
                        toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: response.data.message
                    });
                    
                })
            }
            this.validation = [];
            if (!this.form.name) {
                this.validation['name'] = "Name is required"
                this.isActive = false
            }
            if (!this.form.email) {
                this.validation['email'] = "Email is required"
                this.isActive = false
            }
            if (!this.form.password) {
               this.validation['password'] = "Password is required"
               this.isActive = false
            }
        },
        goback(){
         this.$router.push('/user');
        },
  
    },
}
</script>

<style scoped>
.btn-warning{
    background: darkorange !important;
}

form{
    height: auto;
    width: 320px;
    background-color: rgba(145, 145, 145, 0.13);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 20px rgba(103, 101, 112, 0.6);
    padding: 20px 35px;
}
form *{
    font-family: 'Poppins',sans-serif;
    color: #717D7E;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
}
form h3{
    font-size: 32px;
    font-weight: 500;
    text-align: center;
    color: #45B39D;
}

label{
    display: block;
    margin-top: 6px;
    font-size: 16px;
    font-weight: 500;
    color:#717D7E;
}
input{
    display: block;
    height: 45px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 3px;
    padding: 0 10px;
    font-size: 14px;
    box-sizing: border-box;
    font-weight: 300;
    border: 1px solid #ffffff;
}
::placeholder{
    color: #aaa;
}
button{
    margin-top: 16px;
    background-color: #45B39D;
    color: #ffffff;
    width: 100%;
    padding: 12px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
}
button span{
    color: #ffffff;
}
.btn-danger{
    background: darkred !important;
}

</style>