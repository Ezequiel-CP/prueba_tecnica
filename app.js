const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware para analizar JSON
app.use(bodyParser.json());

// Ruta POST para recibir el JSON
app.post('/calculate-periods', (req, res) => {
  const dateRanges = req.body;

  // Validar que se ha recibido un array de arrays
  if (!Array.isArray(dateRanges) || !dateRanges.every(Array.isArray) || !dateRanges.every(pair => pair.length === 2)) {
    return res.status(400).json({ error: 'El JSON debe ser un array de pares de fechas' });
  }

  try {
    // Convertir las cadenas de tiempo a objetos Date
    const periods = dateRanges.map(([startStr, endStr]) => {
      const start = new Date(startStr);
      const end = new Date(endStr);

      // Validar fechas
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('Formato de fecha inválido');
      }

      // Calcular la diferencia en milisegundos
      const diffMilliseconds = end - start;

      // Convertir a segundos
      const diffSeconds = diffMilliseconds / 1000;

      // Convertir a minutos
      const diffMinutes = diffSeconds / 60;

      // Convertir a horas
      const diffHours = diffMinutes / 60;

      return {
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        diffMilliseconds,
        diffSeconds,
        diffMinutes,
        diffHours
      };
    });

    res.json(periods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
