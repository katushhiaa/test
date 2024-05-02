<template>
  <div class="teacher">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="teacherContainer">
            <div class="students-container">
              <b-table
                :items="students"
                :fields="fields"
                select-mode="multi"
                responsive="sm"
                ref="selectableTable"
                selectable
                @row-selected="onRowSelected"
                @row-unselected="onRowUnselected"
                :per-page="10"
              >
              </b-table>
              <div class="overflow-auto">
                <!-- Use text in props -->
                <b-pagination
                  v-model="currentPage"
                  :total-rows="students.length"
                  :per-page="10"
                  first-text="First"
                  prev-text="Prev"
                  next-text="Next"
                  last-text="Last"
                >
                  <template #ellipsis-text>
                    <b-spinner small type="grow"></b-spinner>
                    <b-spinner small type="grow"></b-spinner>
                    <b-spinner small type="grow"></b-spinner>
                  </template>
                  <template #page="{ page, active }">
                    <b v-if="active">{{ page }}</b>
                    <i v-else>{{ page }}</i>
                  </template>
                </b-pagination>
              </div>
              <p>
                <b-button size="sm" @click="selectAllRows">Select all</b-button>
                <b-button size="sm" @click="clearSelected"
                  >Clear selected</b-button
                >
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-wrapper">
            <h2>Введіть дані сертифікату</h2>
            <form @submit.prevent="generateCertificate">
              <div class="mb-3">
                <input
                  v-model="data.title"
                  type="text"
                  id="title"
                  required
                  class="form-control"
                  placeholder="Назва заходу (участь в)"
                />
              </div>
              <div class="mb-3">
                <input
                  v-model="data.duration"
                  type="text"
                  id="duration"
                  required
                  class="form-control"
                  placeholder="Тривалість (Наприклад: 1 година)"
                />
              </div>
              <div class="mb-3">
                <input
                  v-model="data.teacherSurname"
                  type="text"
                  id="surname-teacher"
                  required
                  class="form-control"
                  placeholder="Прізвище та ініціали викладача, який проводив захід"
                />
              </div>
              <div class="input-box button">
                <button type="submit">Додати</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Network from "@/Network";
import { BTable, BButton, BPagination } from "bootstrap-vue-3";

import "vue3-carousel/dist/carousel.css";
export default defineComponent({
  name: "TeacherPage",
  components: {
    BTable,
    BButton,
    BPagination,
  },
  data() {
    return {
      currentPage: 2,
      data: {
        title: "",
        duration: "",
        teacherSurname: "",
      },
      students: [],
      selectedStudents: [],
      fields: ["student_name"],
    };
  },
  computed: {
    rows() {
      return this.students.length;
    },
  },
  mounted() {
    this.fetchStudents();
  },
  methods: {
    async fetchStudents() {
      try {
        const response = await Network.getAllStudents();
        console.log("This is response: ", response);
        this.students = response.data.map((student) => ({
          student_name: student.name,
        }));
        console.log(this.students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    },
    onRowSelected(student) {
      const index = this.selectedStudents.findIndex(
        (selectedStudent) =>
          selectedStudent.student_name === student.student_name
      );
      if (index === -1) {
        this.selectedStudents.push(student);
      }
      console.log(this.selectedStudents);
    },
    onRowUnselected(student) {
      const index = this.selectedStudents.findIndex(
        (selectedStudent) =>
          selectedStudent.student_name === student.student_name
      );
      if (index !== -1) {
        this.selectedStudents.splice(index, 1);
      }
      console.log(this.selectedStudents);
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
      this.selectedStudents = [];
    },
  },
});
</script>

<style>
.btn {
  position: relative;
  margin: 0 0 0 10px;
  background: #ab4c37;
}
</style>
