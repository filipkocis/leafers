export function errorMessage(error: any, defaultMessage: string = "Unknown error") { 
  return { error: { message: error?.message || defaultMessage }, data: null }
}

export function errorNone() {
  return { error: null, data: null }
}

export function dataNone() {
  return { data: null, error: null }
}

export function dataNonNull<T>(data: NonNullable<T>) {
  return { data, error: null }
}

// not compatible with functions that check for error first
export function dataError<T>(data: NonNullable<T>, error: any) {
  return { ...errorMessage(error), data }
}

// remove this function, use dataSomeNonNull or throw an error on null data
export function dataSome<T>(data: T | null | undefined, defaultValue?: T) {
  return data ? dataNonNull(data) : 
    defaultValue ? dataNonNull(defaultValue) : dataNone()
}

export function dataSomeNonNull<T>(data: T | null | undefined, defaultValue: NonNullable<T>) {
  return data ? dataNonNull(data) : dataNonNull(defaultValue)
}
