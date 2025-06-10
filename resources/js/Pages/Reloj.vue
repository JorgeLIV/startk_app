<template>
  <div class="reloj" :style="{ backgroundColor: colorFondo }">
    <div class="header-reloj">
      <div class="etiqueta" :style="{ color: colorEtiqueta }">{{ nombre }}</div>
      <div class="controles-reloj">
        <button class="edit-button" @click.stop="abrirEdicion">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
          </svg>
        </button>
        <button class="delete-button" @click.stop="eliminarReloj">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>
        </button>
      </div>
    </div>

    <svg viewBox="0 0 100 100" class="clock-svg">
      <circle cx="50" cy="50" r="48" :stroke="colorPuntitos" stroke-width="2" fill="none" />
      <circle
        v-for="n in 12"
        :key="n"
        :cx="50 + 40 * Math.sin((n * 30) * Math.PI / 180)"
        :cy="50 - 40 * Math.cos((n * 30) * Math.PI / 180)"
        r="2"
        :fill="colorPuntitos"
      />
      <line class="hora" :style="{ stroke: colorManecillas }" x1="50" y1="50" :x2="horaX" :y2="horaY" stroke-width="4" stroke-linecap="round" />
      <line class="minuto" :style="{ stroke: colorManecillas }" x1="50" y1="50" :x2="minutoX" :y2="minutoY" stroke-width="3" stroke-linecap="round" />
      <line class="segundo" :style="{ stroke: 'red' }" x1="50" y1="50" :x2="segundoX" :y2="segundoY" stroke-width="1" stroke-linecap="round" />
      <circle cx="50" cy="50" r="3" :fill="colorManecillas" />
    </svg>

    <div class="hora-texto" :style="{ color: colorHora }">{{ horaTexto }}</div>

    <!-- Modal de edición -->
    <div v-if="mostrarEdicion" class="modal-edicion">
      <div class="modal-contenido">
        <h3>Editar Reloj</h3>
        <div class="form-group">
          <label>Nombre:</label>
          <input v-model="editNombre" type="text">
        </div>
        <div class="form-group">
          <label>Color de fondo:</label>
          <input v-model="editColorFondo" type="color">
        </div>
        <div class="form-group">
          <label>Color de texto:</label>
          <input v-model="editColorEtiqueta" type="color">
        </div>
        <div class="form-group">
          <label>Color de manecillas:</label>
          <input v-model="editColorManecillas" type="color">
        </div>
        <div class="form-group">
          <label>Color de hora:</label>
          <input v-model="editColorHora" type="color">
        </div>
        <div class="form-group">
          <label>Color de marcadores:</label>
          <input v-model="editColorPuntitos" type="color">
        </div>
        <div class="botones">
          <button @click="guardarCambios">Guardar</button>
          <button @click="cerrarEdicion">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reloj",
  props: {
    nombre: String,
    zonaHoraria: String,
    colorHora: String,
    colorFondo: String,
    colorEtiqueta: String,
    colorPuntitos: String,
    colorManecillas: String,
  },
  data() {
    return {
      hora: 0,
      minuto: 0,
      segundo: 0,
      timer: null,
      mostrarEdicion: false,
      editNombre: this.nombre,
      editZonaHoraria: this.zonaHoraria,
      editColorHora: this.colorHora,
      editColorFondo: this.colorFondo,
      editColorEtiqueta: this.colorEtiqueta,
      editColorPuntitos: this.colorPuntitos,
      editColorManecillas: this.colorManecillas,
    };
  },
  computed: {
    horaTexto() {
      return new Date().toLocaleTimeString('es-ES', { timeZone: this.zonaHoraria });
    },
    horaX() {
      const anguloHora = ((this.hora % 12) + this.minuto / 60) * 30 * (Math.PI / 180);
      return 50 + 25 * Math.sin(anguloHora);
    },
    horaY() {
      const anguloHora = ((this.hora % 12) + this.minuto / 60) * 30 * (Math.PI / 180);
      return 50 - 25 * Math.cos(anguloHora);
    },
    minutoX() {
      const anguloMinuto = this.minuto * 6 * (Math.PI / 180);
      return 50 + 35 * Math.sin(anguloMinuto);
    },
    minutoY() {
      const anguloMinuto = this.minuto * 6 * (Math.PI / 180);
      return 50 - 35 * Math.cos(anguloMinuto);
    },
    segundoX() {
      const anguloSegundo = this.segundo * 6 * (Math.PI / 180);
      return 50 + 40 * Math.sin(anguloSegundo);
    },
    segundoY() {
      const anguloSegundo = this.segundo * 6 * (Math.PI / 180);
      return 50 - 40 * Math.cos(anguloSegundo);
    }
  },
  mounted() {
    this.actualizarHora();
    this.timer = setInterval(this.actualizarHora, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    actualizarHora() {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: this.zonaHoraria }));
      this.hora = now.getHours();
      this.minuto = now.getMinutes();
      this.segundo = now.getSeconds();
    },
    abrirEdicion() {
      this.editNombre = this.nombre;
      this.editZonaHoraria = this.zonaHoraria;
      this.editColorHora = this.colorHora;
      this.editColorFondo = this.colorFondo;
      this.editColorEtiqueta = this.colorEtiqueta;
      this.editColorPuntitos = this.colorPuntitos;
      this.editColorManecillas = this.colorManecillas;
      this.mostrarEdicion = true;
    },
    cerrarEdicion() {
      this.mostrarEdicion = false;
    },
    guardarCambios() {
      this.$emit('actualizar-reloj', {
        nombre: this.editNombre,
        zonaHoraria: this.editZonaHoraria,
        colorHora: this.editColorHora,
        colorFondo: this.editColorFondo,
        colorEtiqueta: this.editColorEtiqueta,
        colorPuntitos: this.editColorPuntitos,
        colorManecillas: this.editColorManecillas
      });
      this.cerrarEdicion();
    },
    eliminarReloj() {
      this.$emit('eliminar-reloj');
    }
  }
};
</script>

<style scoped>
.reloj {
  width: 160px;
  padding: 15px;
  margin: 15px;
  border-radius: 15px;
  background: linear-gradient(145deg, #e0e7ff, #c0c9ff);
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
}

.header-reloj {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.controles-reloj {
  display: flex;
  gap: 5px;
}

.edit-button, .delete-button {
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.7;
  padding: 5px;
}

.etiqueta {
  font-weight: bold;
  font-size: 1.1rem;
}

.clock-svg {
  width: 110px;
  height: 110px;
  margin: 10px auto;
  display: block;
}

.hora-texto {
  margin-top: 10px;
  font-size: 0.9rem;
}

.modal-edicion {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-contenido {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 300px;
  max-width: 90vw;
  box-shadow: 0 2px 15px rgba(0,0,0,0.2);
}

.form-group {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 4px;
  font-size: 0.9rem;
  font-weight: 500;
}

.form-group input[type="text"],
.form-group input[type="color"] {
  padding: 5px;
  font-size: 0.9rem;
}

.botones {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.botones button {
  padding: 6px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #4f46e5;
  color: white;
}

.botones button:last-child {
  background-color: #d32f2f;
}
</style>
