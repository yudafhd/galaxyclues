type GestureInput = {
  horizontal: number
  vertical: number
}

const gestureInput: GestureInput = {
  horizontal: 0,
  vertical: 0,
}

function clampInput(value: number) {
  return Math.max(-1, Math.min(1, value))
}

export function setGestureInput(input: GestureInput) {
  gestureInput.horizontal = clampInput(input.horizontal)
  gestureInput.vertical = clampInput(input.vertical)
}

export function clearGestureInput() {
  gestureInput.horizontal = 0
  gestureInput.vertical = 0
}

export function getGestureInput() {
  return gestureInput
}
