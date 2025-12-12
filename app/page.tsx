"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useForm, UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
  validation?: any;
}

// Helper component for animated input fields
const AnimatedInput: React.FC<AnimatedInputProps> = ({ id, label, register, errors, type = 'text', watch, validation = {}, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const value = watch(id);

  const isFloating = isFocused || (value && value.length > 0);

  const labelVariants = {
    initial: {
      top: '50%',
      y: '-50%',
      fontSize: '1rem',
      color: '#a1a1aa' // zinc-400
    },
    float: {
      top: '0px',
      y: '-50%',
      fontSize: '0.75rem',
      color: '#3b82f6', // blue-500
      backgroundColor: 'white',
      padding: '0 4px',
    },
  };
  
  const hasError = errors[id];
  let borderColor = 'border-gray-300';
  if (hasError) borderColor = 'border-red-500';
  else if (isFocused) borderColor = 'border-blue-500';

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const currentType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="relative mt-2">
      <motion.label
        htmlFor={id}
        className="absolute left-3 transition-all duration-200 ease-in-out pointer-events-none"
        variants={labelVariants}
        initial="initial"
        animate={isFloating ? 'float' : 'initial'}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      <Input
        id={id}
        type={currentType}
        {...register(id, validation)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full h-12 pt-4 peer ${borderColor} focus:border-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0`}
        {...props}
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <span className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></span>
        </button>
      )}
      {hasError && <p className="text-red-500 text-xs mt-1 ml-1">{errors[id]?.message as string}</p>}
    </div>
  );
};

interface OtpInputProps {
    onComplete: (otp: string) => void;
}

const OtpInput = ({ onComplete }: OtpInputProps) => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.value && element.nextSibling) {
            (element.nextSibling as HTMLInputElement).focus();
        }
        
        const otpString = newOtp.join("");
        if (otpString.length === 6) {
            onComplete(otpString);
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && e.currentTarget.previousSibling) {
            (e.currentTarget.previousSibling as HTMLInputElement).focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.clipboardData.getData("text").trim();
        if (value.length === 6 && !isNaN(Number(value))) {
            const newOtp = value.split("");
            setOtp(newOtp);
            onComplete(value);
            inputsRef.current[5]?.focus();
        }
    };

    return (
        <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {otp.map((data, index) => {
                return (
                    <Input
                        className="w-12 h-14 text-center text-xl font-bold"
                        type="text"
                        name="otp"
                        maxLength={1}
                        key={index}
                        value={data}
                        ref={(el) => { inputsRef.current[index] = el; }}
                        onChange={e => handleChange(e.target, index)}
                        onKeyDown={e => handleKeyDown(e, index)}
                        onFocus={e => e.target.select()}
                    />
                );
            })}
        </div>
    );
};


interface AuthFormProps {
  view: 'login' | 'forgot' | 'reset' | 'signup' | 'otp'
  setView: React.Dispatch<React.SetStateAction<'login' | 'forgot' | 'reset' | 'signup' | 'otp'>>
}

interface FieldConfig {
  id: string;
  label: string;
  type: string;
  validation: any;
}

interface FormConfig {
  title: string;
  subHeader: string;
  subHeaderLinkText?: string;
  subHeaderAction?: () => void;
  fields?: FieldConfig[];
  helperLinkText?: string;
  helperLinkAction?: () => void;
  primaryActionText: string;
  footerText?: string;
  footerLinkText?: string;
  footerAction: () => void;
}

const AuthForm = ({ view, setView }: AuthFormProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, reset } = useForm({
    mode: 'onBlur'
  });
  
  useEffect(() => {
      reset();
  }, [view, reset]);

  const onSubmit = (data: any) => {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            console.log("Form Submitted:", data);
            if (view === 'forgot') {
                setView('reset');
            } else if (view === 'signup') {
                setView('login');
            }
            resolve();
        }, 1500);
    });
  };

  const forms: Record<AuthFormProps['view'], FormConfig> = {
    login: {
      title: 'Welcome Back!',
      subHeader: "Don't have an account?",
      subHeaderLinkText: "Sign Up",
      subHeaderAction: () => setView('signup'),
      fields: [
        { id: 'email', label: 'Email Address', type: 'email', validation: { required: 'Email is required' } },
        { id: 'password', label: 'Password', type: 'password', validation: { required: 'Password is required' } },
      ],
      helperLinkText: "Forgot Password?",
      helperLinkAction: () => setView('forgot'),
      primaryActionText: "Log In",
      footerText: "Don't have an account?",
      footerLinkText: "Sign Up",
      footerAction: () => setView('signup'),
    },
    signup: {
      title: 'Create an Account',
      subHeader: "Join our community to get started",
      fields: [
        { id: 'fullName', label: 'Full Name', type: 'text', validation: { required: 'Full name is required' } },
        { id: 'email', label: 'Email Address', type: 'email', validation: { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } } },
        { id: 'password', label: 'Password', type: 'password', validation: { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } } },
        { id: 'confirmPassword', label: 'Confirm Password', type: 'password', validation: { required: 'Please confirm your password', validate: (value: string) => value === watch('password') || 'Passwords do not match' } },
      ],
      primaryActionText: "Sign Up",
      footerText: "Already have an account?",
      footerLinkText: "Log In",
      footerAction: () => setView('login'),
    },
    forgot: {
        title: "Reset Password",
        subHeader: "Enter your email and we'll send you a link to reset your password.",
        fields: [
            { id: 'email', label: 'Email Address', type: 'email', validation: { required: 'Email is required' } },
        ],
        primaryActionText: "Send Reset Link",
        footerText: "Remembered your password?",
        footerLinkText: "Log In",
        footerAction: () => setView('login'),
    },
    reset: {
        title: "Set a New Password",
        subHeader: "Your new password must be different from previous used passwords.",
        fields: [
            { id: 'newPassword', label: 'New Password', type: 'password', validation: { required: 'New password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } } },
            { id: 'confirmNewPassword', label: 'Confirm New Password', type: 'password', validation: { required: 'Please confirm your new password', validate: (value: string) => value === watch('newPassword') || 'Passwords do not match' } },
        ],
        primaryActionText: "Update Password",
        footerText: "",
        footerLinkText: "Back to Log In",
        footerAction: () => setView('login'),
    },
    otp: {
        title: "Check Your Email",
        subHeader: "We sent a 6-digit code to your email.",
        primaryActionText: "Verify",
        helperLinkText: "Resend Code",
        helperLinkAction: () => console.log("Resend code"),
        footerText: "",
        footerLinkText: "Back to Log In",
        footerAction: () => setView('login'),
    }
  };

  const currentForm = forms[view];

  return (
    <Card className="w-full max-w-md border-none sm:border shadow-none sm:shadow-lg bg-white">
      <CardHeader className="text-center p-6">
        <h1 className="text-3xl font-bold">{currentForm.title}</h1>
        <p className="text-zinc-500">
          {currentForm.subHeader}{' '}
          {currentForm.subHeaderLinkText && (
            <button onClick={currentForm.subHeaderAction} className="font-bold text-blue-500 hover:underline">
              {currentForm.subHeaderLinkText}
            </button>
          )}
        </p>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        {view !== 'otp' && view !== 'reset' && (
            <>
            <div className="space-y-3 mb-4">
                <Button variant="outline" className="w-full h-12 text-lg">
                    <span className="fab fa-google mr-3"></span> Continue with Google
                </Button>
                <Button variant="outline" className="w-full h-12 text-lg bg-black text-white hover:bg-gray-800 hover:text-white">
                    <span className="fab fa-apple mr-3"></span> Continue with Apple
                </Button>
            </div>
            <div className="flex items-center my-6">
                <Separator className="grow" />
                <span className="mx-4 text-xs font-medium text-zinc-400">OR</span>
                <Separator className="grow" />
            </div>
            </>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {view === 'otp' ? (
                <OtpInput onComplete={(code) => {
                    console.log(code);
                    onSubmit({ otp: code });
                }} />
            ) : (
                currentForm.fields?.map(field => (
                    <AnimatedInput
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        type={field.type}
                        register={register}
                        errors={errors}
                        watch={watch}
                        validation={field.validation}
                    />
                ))
            )}
            
            {currentForm.helperLinkText && (
              <div className="flex justify-end">
                <button type="button" onClick={currentForm.helperLinkAction} className="text-sm font-medium text-blue-500 hover:underline">
                  {currentForm.helperLinkText}
                </button>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full mt-8 h-12 text-lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-5 h-5"
              >
                <span className="fas fa-spinner"></span>
              </motion.div>
            ) : currentForm.primaryActionText}
          </Button>
        </form>

        {currentForm.footerLinkText && (
          <p className="text-center text-sm text-zinc-500 mt-8">
            {currentForm.footerText}{' '}
            <button onClick={currentForm.footerAction} className="font-bold text-blue-500 hover:underline">
              {currentForm.footerLinkText}
            </button>
          </p>
        )}
      </CardContent>
    </Card>
  );
};


export default function AuthenticationSuite() {
  const [view, setView] = useState<AuthFormProps['view']>('login');

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 font-sans relative p-4 sm:p-0">
         <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1688141585058-50787735e064?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDI2MjV8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMGJhY2tncm91bmR8ZW58MHwwfHx8MTc2NTU1NDYzOXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Abstract background" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
        </div>
        <div className="relative z-10 w-full md:max-w-md">
            <AnimatePresence mode="wait">
                <motion.div
                    key={view}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <AuthForm view={view} setView={setView} />
                </motion.div>
            </AnimatePresence>
        </div>
    </div>
  );
}