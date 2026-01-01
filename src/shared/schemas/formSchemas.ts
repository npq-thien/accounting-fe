import { z } from 'zod';

// Basic user information schema
export const userInfoSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),

  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),

  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),

  phone: z.string()
    .regex(/^(\+84|84|0)[3|5|7|8|9][0-9]{8}$/, 'Please enter a valid Vietnamese phone number')
    .optional(),

  dateOfBirth: z.date({
    error: 'Date of birth is required',
  })
  .refine((date) => {
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return age >= 18 && age <= 120;
  }, 'You must be at least 18 years old'),

  gender: z.enum(['male', 'female', 'other'], {
    error: 'Please select your gender',
  }),

  address: z.string()
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must be less than 200 characters'),

  city: z.string()
    .min(1, 'City is required')
    .max(50, 'City name is too long'),

  country: z.string()
    .min(1, 'Country is required'),
});

// Account settings schema
export const accountSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),

  confirmPassword: z.string()
    .min(1, 'Please confirm your password'),

  acceptTerms: z.boolean()
    .refine((val) => val === true, 'You must accept the terms and conditions'),

  newsletter: z.boolean().default(false),

  role: z.enum(['user', 'admin', 'moderator'], {
    error: 'Please select a role',
  }).default('user'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Preferences schema
export const preferencesSchema = z.object({
  language: z.enum(['en', 'vi', 'fr', 'es'], {
    error: 'Please select a language',
  }),

  theme: z.enum(['light', 'dark', 'auto'], {
    error: 'Please select a theme',
  }),

  notifications: z.object({
    email: z.boolean().default(true),
    push: z.boolean().default(false),
    sms: z.boolean().default(false),
  }),

  timezone: z.string().min(1, 'Timezone is required'),

  currency: z.enum(['USD', 'EUR', 'VND', 'GBP'], {
    error: 'Please select a currency',
  }),
});

// Work experience schema
export const workExperienceSchema = z.object({
  company: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name is too long'),

  position: z.string()
    .min(2, 'Position must be at least 2 characters')
    .max(100, 'Position is too long'),

  startDate: z.date({
    error: 'Start date is required',
  }),

  endDate: z.date().optional(),

  currentJob: z.boolean().default(false),

  description: z.string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),

  salary: z.number()
    .min(0, 'Salary must be positive')
    .max(1000000, 'Salary seems too high')
    .optional(),
}).refine((data) => {
  if (!data.currentJob && data.endDate && data.startDate) {
    return data.endDate > data.startDate;
  }
  return true;
}, {
  message: 'End date must be after start date',
  path: ['endDate'],
});

// Complete form schema combining all sections
export const completeFormSchema = z.object({
  userInfo: userInfoSchema,
  account: accountSchema,
  preferences: preferencesSchema,
  workExperiences: z.array(workExperienceSchema)
    .min(1, 'At least one work experience is required')
    .max(5, 'Maximum 5 work experiences allowed'),
});

// Type exports for TypeScript
export type UserInfoForm = z.infer<typeof userInfoSchema>;
export type AccountForm = z.infer<typeof accountSchema>;
export type PreferencesForm = z.infer<typeof preferencesSchema>;
export type WorkExperienceForm = z.infer<typeof workExperienceSchema>;
export type CompleteForm = z.infer<typeof completeFormSchema>;

// Default values
export const defaultUserInfo: UserInfoForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: new Date(),
  gender: 'male',
  address: '',
  city: '',
  country: '',
};

export const defaultAccount: AccountForm = {
  username: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  newsletter: false,
  role: 'user',
};

export const defaultPreferences: PreferencesForm = {
  language: 'en',
  theme: 'light',
  notifications: {
    email: true,
    push: false,
    sms: false,
  },
  timezone: 'Asia/Ho_Chi_Minh',
  currency: 'VND',
};

export const defaultWorkExperience: WorkExperienceForm = {
  company: '',
  position: '',
  startDate: new Date(),
  endDate: undefined,
  currentJob: false,
  description: '',
  salary: undefined,
};

export const defaultCompleteForm: CompleteForm = {
  userInfo: defaultUserInfo,
  account: defaultAccount,
  preferences: defaultPreferences,
  workExperiences: [defaultWorkExperience],
};
