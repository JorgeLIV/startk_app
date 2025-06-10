<template>
  <div class="contenedor-principal">
    <h2>Crear relojes personalizados</h2>
    <div class="contenedor-secciones">
      <div class="seccion-formulario">
        <FormularioRelojes @crear-reloj="agregarReloj" />
      </div>
      <div class="seccion-relojes">
        <div class="relojes-container">
          <Reloj
            v-for="(r, i) in relojes"
            :key="i"
            v-bind="r"
            @actualizar-reloj="actualizarReloj"
            @eliminar-reloj="eliminarReloj(i)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormularioRelojes from './FormularioRelojes.vue';
import Reloj from './Reloj.vue';

export default {
  name: "RelojesPadre",
  components: {
    FormularioRelojes,
    Reloj
  },
  data() {
    return {
      relojes: []
    };
  },
  methods: {
    agregarReloj(nuevoReloj) {
      this.relojes.push(nuevoReloj);
    },
    actualizarReloj(datosActualizados) {
      const index = this.relojes.findIndex(r => r.nombre === datosActualizados.nombre);
      if (index !== -1) {
        this.relojes.splice(index, 1, datosActualizados);
      }
    },
    eliminarReloj(index) {
      this.relojes.splice(index, 1);
    }
  }
};
</script>

<style scoped>
h2 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 25px;
}

.contenedor-principal {
  max-width: 1200px;
  margin: 0 auto;
}

.contenedor-secciones {
  display: flex;
  gap: 30px;
}

.seccion-formulario {
  flex: 1;
  min-width: 300px;
}

.seccion-relojes {
  flex: 2;
}

.relojes-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 25px;
}

@media (max-width: 768px) {
  .contenedor-secciones {
    flex-direction: column;
  }
}
</style>
