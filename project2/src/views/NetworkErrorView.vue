<template>
  <div class="networkError flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
    <h1 class="text-5xl font-bold text-red-500 mb-4">Uh-Oh!</h1>
    <h3 class="text-xl text-gray-700 mb-6">
      It looks like you're experiencing some network issues, please take a breath and
      <a href="#" @click="$router.go(-1)" class="text-blue-500 hover:underline">click here</a> to try again.
    </h3>
  </div>
</template>