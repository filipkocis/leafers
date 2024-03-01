export function errorMessage(error: any, defaultMessage: string = "Unknown error") { 
  return { error: { message: error?.message || defaultMessage } }
}

export function errorNone() {
  return { error: null }
}

export function dataNone() {
  return { data: null, error: null }
}

export function dataNonNull<T>(data: T) {
  return { data, error: null }
}

export function dataError<T>(data: T, error: any) {
  return { data, ...errorMessage(error) }
}

export function dataSome<T>(data: T | null | undefined, defaultValue?: T) {
  return data ? dataNonNull(data) : 
    defaultValue ? dataNonNull(defaultValue) : dataNone()
}

export function dataSomeNonNull<T>(data: T | null | undefined, defaultValue: NonNullable<T>) {
  return data ? dataNonNull(data) : dataNonNull(defaultValue)
}
