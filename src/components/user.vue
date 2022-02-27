<template>
  <div>
    <h4>
        <router-link to="/register" class="btn btn-info" style="padding:12px 24px">Registration</router-link>
         
    </h4>
   
    <table border="1">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>action</th>
        </tr>
      </thead>
      <tr v-for="(list, index) in user" :key="list.id">
        <td>{{ index + 1 }}</td>
        <td>{{ list.name }}</td>
        <td>{{ list.email }}</td>
        <td>
          <button class="btn btn-danger" style="font-size:16px" @click="deleteUserData(index)">Delete</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      user: [],
    };
  },
   mounted() {
     this.axios.get("users").then((response) => {
        this.user = response.data.Users;
      });

      if(!localStorage.getItem("user")){
            this.$router.push('/')
        }
  },
  methods: {
      deleteUserData(index){
        this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) {
        this.axios.get("delete_user/"+this.user[index].id).then((response) => {
            this.user.splice(index,1)
            this.$swal.fire(
            'Deleted!',
            response.data.message,
            'success'
            )
            });
        }
        });   
    },

   

  }
 
};
</script>

<style>
table {
  border-collapse: collapse;
  width: 65%;
  margin: auto;
}

td{
  padding: 2px 14px;
  text-align: left;
}
th{
  padding: 12px 14px;
  text-align: left;
}
thead{
    background: #f1f1f1;
}
.btn {
  padding: 6px 8px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  border-radius: 4px;
}
.btn-info {
  background: rgb(10, 106, 170);
  color: white;
}
.btn-danger {
  background: rgb(206, 45, 45);
  color: white;
}
</style>