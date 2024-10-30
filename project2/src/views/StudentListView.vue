<template>
  <div>
    <h1>Student List</h1>
    <div class="students">
      <div class="student-card" v-for="student in students" :key="student.id">
        <h2>{{ student.name }} {{ student.surname }}</h2>
        <p>GPA: {{ student.gpa }}</p>
        <p>Description: {{ student.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import StudentService from '@/services/StudentService';

const students = ref([]);

onMounted(() => {
  StudentService.getStudents()
    .then((response) => {
      students.value = response.data;
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
});
</script>

<style scoped>
.students {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.student-card {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  width: 250px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.student-image {
  width: 100%;
  height: auto;
  border-radius: 50%;
}
</style>
