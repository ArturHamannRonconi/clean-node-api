import { join } from 'path'
import { FileSystemLoggerRepository } from '../../../infra/repositories/fileSystem/LoggerRepository/FileSystemLoggerRepository'
import { Controller } from '../../../presentation/protocols'
import { LoggerControllerDecorator } from '../../decorators/LoggerControllerDecorator/LoggerControllerDecorator'

const loggerDecoratorFactory = <T> (controller: Controller<T>): Controller<T> => new LoggerControllerDecorator<T>(
  controller,
  new FileSystemLoggerRepository(
    join(__dirname, '..', '..', '..', '..', 'log')
  )
)

export { loggerDecoratorFactory }
