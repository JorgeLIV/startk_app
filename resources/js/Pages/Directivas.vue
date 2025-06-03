<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-4xl font-bold mb-6">Directivas de Control</h1>

    <p class="mb-6 text-lg text-gray-700">{{ saludar }}</p>

    <h2 class="text-2xl font-semibold mb-2">v-show</h2>
    <p v-show="numero >= 10" class="mb-4 text-blue-600">Este texto se muestra con v-show</p>

    <hr class="mb-6" />
    <br />

    <h2 class="text-2xl font-semibold mb-2">v-if / v-else-if / v-else</h2>
    <p v-if="numero > 10" class="mb-2 text-green-600 font-medium">Número mayor que 10</p>
    <p v-else-if="numero === 10" class="mb-2 text-yellow-600 font-medium">Número igual a 10</p>
    <p v-else class="mb-4 text-red-600 font-medium">Número menor que 10</p>

    <hr class="mb-6" />
    <br />

    <h2 class="text-2xl font-semibold mb-2">v-for</h2>
    <ul class="list-disc list-inside mb-6">
      <li v-for="(numero, index) in lista" :key="index" class="text-gray-800">
        número: {{ numero }}
      </li>
    </ul>
    <br />

    <h3 class="text-xl font-semibold mb-3">Botón para cambiar número</h3>
    <button
      @click="numero--"
      class="mr-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Disminuir número
    </button>
    <button
      @click="numero++"
      class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
    >
      Aumentar número
    </button>
    <p class="mt-4 text-lg font-medium">Número actual: {{ numero }}</p>
  </div>
</template>

<script setup>
import { useDirectivas } from '@/composables/useDirectivas.js'

const { saludar, numero, lista } = useDirectivas()
</script>
