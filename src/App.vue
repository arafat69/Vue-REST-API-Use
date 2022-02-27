<template>


<div v-if="user">
<ul>
  <li><router-link to="/home">Home</router-link></li>
  <li><router-link to="/user">User</router-link></li>
  <li style="float:right"><a href="javascript:void(0)" @click="logout">Logout</a></li>
</ul>

</div>





 <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      user : localStorage.getItem('user')
    }
  },
  methods: {
     logout(){
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.go('/')
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0 42px;
  color: #2c3e50;
  margin-top: 8px;
}
ul {
  list-style-type: none;
  margin: 0;
  margin-bottom: 8px;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 16px 18px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}

.active {
  background-color: #04AA6D;
}
</style>
