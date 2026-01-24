import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

/*
|--------------------------------------------------------------------------
| Match Decorator
|--------------------------------------------------------------------------
|
| Validates that two properties have matching values.
|
*/
export function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'Match',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: unknown, args: ValidationArguments): boolean {
          const relatedPropertyName = args.constraints[0] as string;
          const relatedValue = (args.object as Record<string, unknown>)[
            relatedPropertyName
          ];

          return value === relatedValue;
        },
      },
    });
  };
}
