import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator'

export function IsDateAsString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDateAsString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false
          }

          const dateRegex = /^\d{4}-\d{2}$/
          return dateRegex.test(value)
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a date on format "yyyy-mm"!`
        },
      },
    })
  }
}