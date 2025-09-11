export function showLoginOrSignUpError(error: {
  data?: { message?: string; data?: { fieldErrors?: Record<string, string[]> } }
}) {
  const errors = error?.data?.data?.fieldErrors
  if (typeof error?.data?.message !== 'undefined') {
    showError(error.data.message)
  }

  if (errors) {
    for (const inputFieldName in errors) {
      for (const inputErrorMessage of errors[inputFieldName]) {
        showError(inputErrorMessage)
      }
    }
  }
}
