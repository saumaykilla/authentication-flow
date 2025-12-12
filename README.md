# Authentication Flow

A modern, highly animated, and responsive authentication suite built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. This project demonstrates a seamless user experience for common authentication tasks, featuring smooth transitions and interactive UI elements.

## ✨ Features

- **Comprehensive Auth Suite**: Includes fully functional UI for:
  - **Login**: Secure access with email and password.
  - **Sign Up**: New user registration with validation.
  - **Forgot Password**: Request reset links.
  - **Reset Password**: Securely update credentials.
  - **OTP Verification**: Interactive 6-digit one-time password input.
- **Dynamic Animations**: Powered by `framer-motion` for smooth page transitions and floating labels.
- **Form Management**: Robust form handling and validation using `react-hook-form`.
- **Modern UI**: Built with Shadcn-like components and tailored Tailwind CSS styles.
- **Responsive Design**: Mobile-first approach ensuring perfect rendering on all devices.
- **Floating Labels**: Interactive input fields that animate on focus.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Icons**: FontAwesome (via CDN) & Lucide React
- **Utilities**: `clsx`, `tailwind-merge`, `class-variance-authority`

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1.  **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd authentication-flow
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server**:

    ```bash
    npm run dev
    ```

4.  **Open the app to view it in the browser**:
    Visit [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```bash
authentication-flow/
├── app/
│   ├── layout.tsx      # Main layout with FontAwesome CDN
│   ├── page.tsx        # Core Authentication Suite component (Logic & UI)
│   └── globals.css     # Global styles and Tailwind directives
├── components/
│   └── ui/             # Reusable UI components (Button, Card, Input, Separator)
├── public/             # Static assets
└── package.json        # Project dependencies and scripts
```

## 🎨 Design details

- **Background**: Uses a high-quality abstract geometric background from Unsplash with a blurred overlay for depth.
- **Transitions**: `AnimatePresence` handles the smooth switching between different auth views (e.g., sliding from Login to Sign Up).
- **Inputs**: Custom `AnimatedInput` component manually implements the "Material Design" floating label effect using framer-motion.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
