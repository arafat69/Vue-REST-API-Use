<template>
  <div id="totalrap">
    <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <form @submit.prevent="login">
        <h3>Login Here</h3>
       <div style="color:red" v-text="error"></div>
        <label for="username">Email</label>
        <input type="email" placeholder="Email Address" v-model="form.email" name="email" id="username">
        <small style="color:red" v-text="validation.email"></small>

        <label for="password">Password</label>
        <input type="password" placeholder="Password" v-model="form.password" name="password" id="password">
        <small style="color:red" v-text="validation.password"></small>
    
        <button type="submit" :disabled="isActive"> <span v-if="isActive">Loading..</span><span v-else>Log In</span></button>
        
    </form>
    </div>
</template>
<script>
export default {
    name: "Login",
    data() {
        return {
            isActive: false,
            form: {
                email: '',
                password: ''
            },
            error:'',
            validation:[]
        }
    },
    mounted() {
        if(localStorage.getItem("user")){
            this.$router.push('/home')
        }
    },
    methods: {
        login(){
            this.isActive = true
            if (this.form.email && this.form.password) {
                 this.axios.post("login",this.form).then((response)=>{
                    localStorage.setItem("token",response.data.token);
                    localStorage.setItem("user",response.data.user);
                   
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
                        title: "Login Successfully"
                    });
                    //redairect to home
                     this.$router.go('/home')
                }).catch(error=>{
                    this.isActive = false
                    this.error = error.response.data.message
                })
            }
            this.validation = [];
            if (!this.form.email) {
                this.validation['email'] = "Email is required"
                this.isActive = false
            }
            if (!this.form.password) {
               this.validation['password'] = "Password is required"
               this.isActive = false
            }
           
        }
    },
}
</script>

<style scoped>

.background{
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
}
.background .shape{
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
}
.shape:first-child{
    background: linear-gradient(
        #1845ad,
        #23a2f6
    );
    left: -80px;
    top: -80px;
}
.shape:last-child{
    background: linear-gradient(
        to right,
        #ff512f,
        #f09819
    );
    right: -30px;
    bottom: -80px;
}
form{
    height: 360px;
    width: 320px;
    background-color: rgba(66, 64, 64, 0.13);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 20px rgba(8,7,16,0.6);
    padding: 50px 35px;
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
    line-height: 42px;
    text-align: center;
    color: #45B39D;
}

label{
    display: block;
    margin-top: 16px;
    font-size: 16px;
    font-weight: 500;
    color:#5D6D7E;
}
input{
    display: block;
    height: 45px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    box-sizing: border-box;
    font-weight: 300;
}
::placeholder{
    color: #aaa;
}
button{
    margin-top: 50px;
    width: 100%;
    background-color: #45B39D;
    padding: 12px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
} button span{
color: #ffffff;
}

</style>