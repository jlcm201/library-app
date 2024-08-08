module.exports = {
  // Define la ruta raíz donde Jest buscará archivos de prueba
  roots: ['<rootDir>/src/tests'], // Cambia esto para que apunte a tu carpeta de pruebas

  // Especifica patrones para encontrar archivos de prueba
  testMatch: [
    '**/?(*.)+(test).[jt]s?(x)', // Busca archivos que terminan en .test.js, .test.jsx, .test.ts o .test.tsx
    '**/?(*.)+(spec).[jt]s?(x)'  // Busca archivos que terminan en .spec.js, .spec.jsx, .spec.ts o .spec.tsx
  ],

  // Configura el entorno de prueba para un entorno de navegador simulado
  testEnvironment: 'jsdom',

  // Configura el preprocesamiento de archivos con Babel
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!some-other-module-to-transform)/',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },

  // Configura la cobertura de código
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // Incluye todos los archivos JS/TS en src para la cobertura
    '!src/index.js', // Excluye archivos específicos si es necesario
    '!src/reportWebVitals.js',
    '!src/setupTests.js',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // Reporta cobertura en varios formatos

  // Permite usar imports de módulos CSS
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },

  // Opciones adicionales para mejorar la salida de las pruebas
  verbose: true, // Muestra detalles de las pruebas en la salida
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Archivo de configuración adicional para Jest
};
