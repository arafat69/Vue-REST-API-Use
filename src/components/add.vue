<template>
  <div>
      <div class="card">
          <div class="card-title">
              <h4 style="margin:0">Add New</h4>
          </div>
          <form @submit.prevent="addStudent">
          <div class="card-body">
              <label for="">Name</label>
              <input type="text" name="name" v-model="student.name" class="form-control" placeholder="Enter Name">
              <small style="color:red" v-text="errors && errors.name"></small>
              <label for="">Roll Number</label>
              <input type="text" name="roll" v-model="student.roll" class="form-control" placeholder="Enter Roll">
              <small style="color:red" v-text="errors && errors.roll"></small>
              <label for="">Reg Number</label>
              <input type="text" name="reg" v-model="student.reg" class="form-control" placeholder="Enter Registration">
              <small style="color:red;" v-text="errors && errors.reg"></small>
              <label for="">Department</label>
              <select name="department" v-model="student.department" class="form-control">
                  <option value="Computer">Computer</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Electronic">Electronic</option>
                  <option value="Civil">Civil</option>
              </select>
               <small style="color:red" v-text="errors && errors.department"></small>
          </div>
           <div class="card-footer">
             <span v-if="isActive"><button class="btn btn-warning" style="font-size:18px">Loading..</button></span>
             <span v-else><button type="submit" class="btn btn-info" style="font-size:18px">Submit</button></span>
              <button type="button" class="btn btn-danger" @click="goback" style="font-size:18px">Go Back</button>
          </div>
          </form>
      </div>
    
  </div>
</template>

<script>
export default {
  name: "Add",
  data() {
    return {
        isActive:false,
      student: {
          name:'',
          roll:'',
          reg:'',
          department:'',
      },
      errors:[]
    };
  },
  mounted() {
    if(!localStorage.getItem("user")){
            this.$router.push('/')
        }
  },
  methods: {
      addStudent(){
         this.isActive= true
         if (this.student.name && this.student.roll && this.student.reg && this.student.department) {
           
          this.axios.post('add_student',this.student).then((response)=>{
            this.$router.push('/')
            //alert notification
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
          //
          })
        }
        //valodation
        this.errors= []
        if (!this.student.name) {
          this.errors['name'] = "Name is required"
          this.isActive = false
        }
        if (!this.student.roll) {
          this.errors['roll'] = "Roll is required"
          this.isActive = false
        }
        if (!this.student.reg) {
          this.errors['reg'] = "Registration is required"
          this.isActive = false
        }
        if (!this.student.department) {
          this.errors['department'] = "Department is required"
          this.isActive = false
        }
      },
      goback(){
       this.$router.push('/home')
    },
  }
};
</script>

<style>
small{
  display: block;
}
.card {
    width: 65%;
    margin: auto;
  border: 1px solid #ccc;
}
.card-title,.card-footer{
    background: #f2f2f2;
    padding: 12px 16px;
}
.card-body{
    padding: 8px 16px;
}

.form-control{
    width: 100%;
    box-sizing: border-box;
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #aaa;
    border-radius: 4px;
    margin-bottom: 4px;
}
label{
    font-weight: 600;
}
.btn {
  padding: 10px 16px !important;
  border: none;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  border-radius: 4px;
  margin: 2px;
}
.btn-info {
  background: rgb(10, 106, 170);
  color: white;
}
.btn-warning{
  background: darkorange;
  color: #fff;
}
.btn-danger {
  background: rgb(206, 45, 45);
  color: white;
}
@media only screen and (max-width: 600px) {
  .card {
    width: 100%;
  }
}
</style>