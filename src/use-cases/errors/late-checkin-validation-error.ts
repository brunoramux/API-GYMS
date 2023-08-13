export class LateCheckInValidationError extends Error {
  constructor() {
    super('Validation Check-In out of time')
  }
}
