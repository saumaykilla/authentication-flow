# Authentication Flow 🔐

**Reusable React Authentication Library**

A comprehensive, production-ready authentication component library for React featuring login, registration, password recovery, and reset flows with beautiful UI and smooth animations.

---

## 🌟 Features

- 🔑 **Login Screen** - Email/password authentication
- 📝 **Registration** - New user signup with validation
- 🔐 **Forgot Password** - Password recovery flow
- ✅ **Reset Password** - Secure password reset
- 📱 **Responsive Design** - Works on all devices
- ✨ **Smooth Animations** - Professional transitions
- 🎨 **Customizable Theme** - Easy styling override
- ♿ **Accessible** - WCAG compliant
- 📝 **Form Validation** - Built-in validation
- 🔒 **Secure** - Best security practices

---

## 🛠️ Tech Stack

**Frontend:**
- React with TypeScript
- React Hook Form (form handling)
- Zod/Yup (validation)
- Tailwind CSS
- Framer Motion (animations)
- Shadcn UI

---

## 📊 Language Composition

```
TypeScript: 98.9%
Other: 1.1%
```

---

## 🚀 Getting Started

### Installation

```bash
# Via npm
npm install authentication-flow

# Via yarn
yarn add authentication-flow

# Via pnpm
pnpm add authentication-flow
```

### Usage

```tsx
import { AuthenticationFlow } from 'authentication-flow';

export default function App() {
  return (
    <AuthenticationFlow
      onSuccess={(user) => console.log('Logged in:', user)}
      onError={(error) => console.log('Error:', error)}
    />
  );
}
```

---

## 📁 Project Structure

```
authentication-flow/
├── src/
│   ├── components/
│   │   ├── LoginForm.tsx       # Login component
│   │   ├── RegisterForm.tsx    # Registration component
│   │   ├── ForgotPassword.tsx  # Forgot password flow
│   │   ├── ResetPassword.tsx   # Password reset
│   │   ├── InputField.tsx      # Reusable input
│   │   └── SubmitButton.tsx    # Reusable button
│   ├── hooks/
│   │   ├── useAuth.ts          # Auth logic
│   │   └── useForm.ts          # Form logic
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   ├── styles/
│   │   └── globals.css         # Global styles
│   ├── utils/
│   │   ├── validation.ts       # Form validation
│   │   └── constants.ts        # Constants
│   └── index.ts                # Main export
├── examples/
│   └── BasicUsage.tsx
├── package.json
└── README.md
```

---

## 🎯 Components

### AuthenticationFlow

Main component wrapper:

```tsx
<AuthenticationFlow
  mode="login"  // 'login' | 'register' | 'forgot' | 'reset'
  onSuccess={(user) => {}}
  onError={(error) => {}}
  onNavigate={(screen) => {}}
  theme="light"  // 'light' | 'dark'
/>
```

### LoginForm

Login screen:

```tsx
import { LoginForm } from 'authentication-flow';

<LoginForm
  onSuccess={handleLoginSuccess}
  onForgotPassword={handleForgotClick}
  onRegister={handleRegisterClick}
/>
```

### RegisterForm

Registration screen:

```tsx
import { RegisterForm } from 'authentication-flow';

<RegisterForm
  onSuccess={handleRegisterSuccess}
  onLogin={handleLoginClick}
  passwordRequirements={{
    minLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  }}
/>
```

### ForgotPasswordForm

Password recovery:

```tsx
import { ForgotPasswordForm } from 'authentication-flow';

<ForgotPasswordForm
  onSuccess={handleEmailSent}
  onBack={handleGoBack}
/>
```

### ResetPasswordForm

Password reset:

```tsx
import { ResetPasswordForm } from 'authentication-flow';

<ResetPasswordForm
  token={resetToken}
  onSuccess={handlePasswordReset}
  onError={handleError}
/>
```

---

## 💻 Complete Example

```tsx
import React, { useState } from 'react';
import { AuthenticationFlow } from 'authentication-flow';

export default function AuthPage() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);

  const handleSuccess = (userData) => {
    setUser(userData);
    // Redirect to dashboard
    window.location.href = '/dashboard';
  };

  const handleError = (error) => {
    console.error('Authentication error:', error);
  };

  const handleScreenChange = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <AuthenticationFlow
        mode={currentScreen}
        onSuccess={handleSuccess}
        onError={handleError}
        onNavigate={handleScreenChange}
        theme="dark"
      />
    </div>
  );
}
```

---

## 🔐 Authentication Flows

### Login Flow

```
User Input Email/Password
    ↓
Validation
    ↓
API Call
    ↓
Token Storage
    ↓
Success/Error
```

### Registration Flow

```
User Input Details
    ↓
Validation
    ↓
Check Email Exists
    ↓
Create Account
    ↓
Send Verification Email
    ↓
Success
```

### Forgot Password Flow

```
User Enters Email
    ↓
Verify Email Exists
    ↓
Send Reset Link
    ↓
User Clicks Link
    ↓
Reset Password
    ↓
Success
```

---

## 🎨 Customization

### Theme

```tsx
<AuthenticationFlow
  theme={{
    primary: '#3B82F6',
    secondary: '#10B981',
    danger: '#EF4444',
    background: '#F3F4F6',
    text: '#1F2937',
  }}
/>
```

### Styling

```tsx
<AuthenticationFlow
  className="custom-auth"
  styles={{
    form: "custom-form-class",
    input: "custom-input-class",
    button: "custom-button-class",
  }}
/>
```

### Validation Rules

```tsx
<RegisterForm
  passwordRequirements={{
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    specialChars: "!@#$%",
  }}
/>
```

---

## 🎬 Animations

Built-in animations:
- Fade in/out transitions
- Slide up/down transitions
- Scale transitions
- Stagger effects

Customize via props:

```tsx
<AuthenticationFlow
  animationDuration={0.5}
  animationType="slide"  // 'fade' | 'slide' | 'scale'
/>
```

---

## 📦 Exports

```typescript
export { AuthenticationFlow } from './components/AuthenticationFlow';
export { LoginForm } from './components/LoginForm';
export { RegisterForm } from './components/RegisterForm';
export { ForgotPasswordForm } from './components/ForgotPasswordForm';
export { ResetPasswordForm } from './components/ResetPassword';
export { useAuth } from './hooks/useAuth';
export type { User, AuthError, AuthResponse } from './types';
```

---

## 🔒 Security Features

- ✅ Password hashing
- ✅ HTTPS only
- ✅ CSRF protection
- ✅ XSS prevention
- ✅ Input sanitization
- ✅ Secure token storage
- ✅ Rate limiting ready

---

## 📱 Responsive Design

- Mobile: Optimized layout
- Tablet: Balanced layout
- Desktop: Full-width layout

---

## 🧪 Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/Enhancement`)
3. Commit changes (`git commit -m 'Add Enhancement'`)
4. Push to branch (`git push origin feature/Enhancement`)
5. Open Pull Request

---

## 📝 License

MIT License - see LICENSE file for details

---

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Email: [saumay.killa@gmail.com](mailto:saumay.killa@gmail.com)

---

## 🔗 Links

- **Live Demo**: [https://saumay-authentication-flow.vercel.app](https://saumay-authentication-flow.vercel.app)
- **GitHub**: [https://github.com/saumaykilla/authentication-flow](https://github.com/saumaykilla/authentication-flow)
- **NPM**: [https://www.npmjs.com/package/authentication-flow](https://www.npmjs.com/package/authentication-flow)

---

<div align="center">

**Secure Authentication Made Simple**

Made with ❤️ by Saumay Killa

[⬆ back to top](#authentication-flow-)

</div>
