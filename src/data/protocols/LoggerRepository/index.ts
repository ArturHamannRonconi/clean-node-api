interface LoggerRepository {
  log: (description: string) => Promise<void>
}

export { LoggerRepository }
