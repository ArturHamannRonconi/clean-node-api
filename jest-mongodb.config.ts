export default {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      version: '4.0.3',
      skipMD4: true
    },
    autoStart: false
  }
}
