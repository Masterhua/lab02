<template>
  <div>
    <h1 class="text-4xl font-bold text-center mb-6">Student List</h1>
    <div class="students flex flex-wrap justify-center">
      <div class="student-card border border-gray-300 p-5 m-4 rounded-lg w-64 text-center shadow-md" v-for="student in students" :key="student.id">
        <h2 class="text-xl font-semibold">{{ student.name }} {{ student.surname }}</h2>
        <p class="text-lg">GPA: {{ student.gpa }}</p>
        <p class="text-gray-700">Description: {{ student.description }}</p>
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
