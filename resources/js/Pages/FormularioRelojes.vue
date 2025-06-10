<template>
  <form @submit.prevent="handleSubmit" class="formulario">
    <div>
      <label>Nombre del reloj:</label>
      <input v-model="nombre" required />
    </div>

    <div>
      <label>Formato de hora:</label>
      <div class="format-options">
        <label>
          <input type="radio" v-model="formatoHora" value="24h" @change="updateTimeFormat" />
          24 horas
        </label>
        <label>
          <input type="radio" v-model="formatoHora" value="12h" @change="updateTimeFormat" />
          12 horas (AM/PM)
        </label>
      </div>
    </div>

    <div>
      <label>Hora inicial:</label>
      <div class="time-input-wrapper">
        <input
          type="time"
          v-model="horaManual"
          :step="formatoHora === '24h' ? '1' : '60'"
          class="time-picker"
          ref="timeInput"
        />
        <span class="time-icon">🕒</span>
      </div>
    </div>

    <div>
      <label>Color de la hora:</label>
      <input type="color" v-model="colorHora" />
    </div>

    <div>
      <label>Color de fondo:</label>
      <input type="color" v-model="colorFondo" />
    </div>

    <div>
      <label>Color etiqueta:</label>
      <input type="color" v-model="colorEtiqueta" />
    </div>

    <div>
      <label>Color de puntitos:</label>
      <input type="color" v-model="colorPuntitos" />
    </div>

    <div>
      <label>Color de manecillas:</label>
      <input type="color" v-model="colorManecillas" />
    </div>

    <button type="submit">Agregar reloj</button>
  </form>
</template>

<script>
export default {
  name: "FormularioRelojes",
  data() {
    return {
      nombre: '',
      formatoHora: '24h',
      horaManual: '',
      colorHora: '#000000',
      colorFondo: '#ffffff',
      colorEtiqueta: '#000000',
      colorPuntitos: '#000000',
      colorManecillas: '#000000',
    };
  },
  methods: {
    handleSubmit() {
      const nuevoReloj = {
        nombre: this.nombre,
        formatoHora: this.formatoHora,
        horaManual: this.horaManual || null,
        colorHora: this.colorHora,
        colorFondo: this.colorFondo,
        colorEtiqueta: this.colorEtiqueta,
        colorPuntitos: this.colorPuntitos,
        colorManecillas: this.colorManecillas,
      };
      this.$emit('crear-reloj', nuevoReloj);
      this.resetForm();
    },
    resetForm() {
      this.nombre = '';
      this.formatoHora = '24h';
      this.horaManual = '';
      this.colorHora = '#000000';
      this.colorFondo = '#ffffff';
      this.colorEtiqueta = '#000000';
      this.colorPuntitos = '#000000';
      this.colorManecillas = '#000000';
    },
    updateTimeFormat() {
      this.horaManual = '';
      this.$nextTick(() => {
        this.$refs.timeInput.step = this.formatoHora === '24h' ? '1' : '60';
      });
    }
  }
};
</script>

<style scoped>
.formulario {
  max-width: 350px;
  background: #898b8f;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.formulario div {
  margin-bottom: 2px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
}

input[type="text"],
input[type="color"],
input[type="time"] {
  padding: 8px 10px;
  border: 1.5px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.time-picker {
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  width: 100%;
}

input[type="text"]:focus,
input[type="color"]:focus,
input[type="time"]:focus {
  border-color: #4a90e2;
  outline: none;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4a90e2;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #357ABD;
}

.format-options {
  display: flex;
  gap: 15px;
  margin-top: 2px
}

.format-options label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: normal;
  cursor: pointer;
}

.format-options input[type="radio"] {
  margin: 0;
}

.time-input-wrapper {
  position: relative;
}

.time-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

input[type="time"]::-webkit-calendar-picker-indicator {
  background: none;
  display: none;
}
</style>
