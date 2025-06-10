import { ref } from 'vue'

export function useDirectivas() {
  const saludar = ref('Hola, Vue + Laravel Breeze!')
  const numero = ref(11)
  const lista = ref([1, 200, 3])
 
  return {
    saludar,
    numero,
    lista,
  }
}
