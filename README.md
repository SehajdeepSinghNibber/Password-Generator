# Password Generator React App

A modern, interactive password generator built with React that allows users to create secure passwords with customizable options.

## Features

- **Customizable Length**: Generate passwords between 4-20 characters
- **Number Inclusion**: Option to include numbers (0-9)
- **Special Characters**: Option to include special characters (!@#$%^&*()_+)
- **One-Click Copy**: Copy generated password to clipboard
- **Real-time Generation**: Password updates automatically when settings change
- **Responsive Design**: Clean UI with dark theme

## Component Structure

### State Management
```javascript
const [length, setLength] = useState(8)                         // Password length (default: 8)
const [numberAllowed, setNumberAllowed] = useState(false)       // Include numbers
const [characterAllowed, setCharacterAllowed] = useState(false) // Include special chars
const [password, setPassword] = useState("")                    // Generated password
```

### Key Functions

#### `generatePassword()`

Uses `useCallback` hook for optimization. Builds character set based on user preferences, generates random password from available characters. Dependencies: `[length, numberAllowed, characterAllowed]`
```javascript
const generatePassword = useCallback(() => {
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if (numberAllowed) str += "0123456789"
  if (characterAllowed) str += "!@#$%^&*()_+"
  for (let i = 0; i < length; i++) {
    const char = Math.floor(Math.random() * str.length)
    pass += str.charAt(char)
  }
  setPassword(pass)
}, [length, numberAllowed, characterAllowed])
```

#### `copyPasswordToClipboard()`

Uses native Clipboard API to copy password. Triggered by "Copy" button click. Dependency: `[password]`
```javascript
const copyPasswordToClipboard = useCallback(() => {
  window.navigator.clipboard.writeText(password)
}, [password])
```

### Effects
```javascript
useEffect(() => {
  generatePassword()
}, [length, numberAllowed, characterAllowed, generatePassword])
```

Automatically regenerates password when any setting changes.

## UI Components

### Password Display

- Read-only input field showing generated password
- "Copy" button with hover and active states
- Orange accent color (#f97316)

### Controls

1. **Length Slider**: Range input (4-20) with live value display
2. **Numbers Toggle**: Checkbox to include/exclude numbers
3. **Special Characters Toggle**: Checkbox to include/exclude special characters

## Styling

- **Theme**: Dark background with gray card (`bg-gray-800`)
- **Accent Color**: Orange (`text-orange-500`, `bg-orange-500`)
- **Layout**: Centered flex container with responsive max-width
- **Utilities**: Tailwind CSS for all styling

## Usage

1. Adjust the length slider to set desired password length
2. Toggle checkboxes to include numbers and/or special characters
3. Password generates automatically
4. Click "Copy" to copy password to clipboard

## Technical Highlights

- **React Hooks**: `useState`, `useCallback`, `useEffect`, `useRef`
- **Performance**: Memoized callbacks prevent unnecessary re-renders
- **Accessibility**: Labeled inputs and semantic HTML
- **Modern APIs**: Clipboard API for copy functionality

## Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

## Dependencies

- React 18+
- Tailwind CSS

## Browser Compatibility

Requires modern browsers with support for:
- Clipboard API
- ES6+ features
- CSS Flexbox
