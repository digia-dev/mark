import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Lock, Eye, EyeOff, Mail, UserPlus, LogIn } from 'lucide-react';
import { useRegister } from '../features/auth/hooks/use-auth';
import AuthLayout from '../features/auth/components/AuthLayout';

const registerSchema = z.object({
  name: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  username: z.string().min(3, 'Username minimal 3 karakter'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  confirmPassword: z.string().min(8, 'Konfirmasi password minimal 8 karakter'),
  agreeTerms: z.boolean().refine(val => val === true, 'Anda harus menyetujui syarat & ketentuan')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { agreeTerms: false }
  });

  const onSubmit = (data) => {
    const { confirmPassword, agreeTerms, ...userData } = data;
    registerMutation.mutate(userData, {
      onSuccess: () => {
        navigate('/login');
      }
    });
  };

  return (
    <AuthLayout illustration={true}>
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Buat Akun Baru</h1>
        <p className="text-gray-500 font-medium">Lengkapi data di bawah untuk membuat akun</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-[10px] font-black text-gray-900 uppercase tracking-widest mb-1.5 ml-1">Nama Lengkap</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-900 transition-colors">
              <User size={18} />
            </div>
            <input 
              {...register('name')}
              type="text" 
              placeholder="Masukkan nama lengkap"
              className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 ${errors.name ? 'border-red-100' : 'border-gray-50'} rounded-2xl text-sm font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all`}
            />
          </div>
          {errors.name && <p className="text-[10px] font-bold text-red-500 mt-1 ml-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-[10px] font-black text-gray-900 uppercase tracking-widest mb-1.5 ml-1">Email</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-900 transition-colors">
              <Mail size={18} />
            </div>
            <input 
              {...register('email')}
              type="email" 
              placeholder="Masukkan email"
              className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 ${errors.email ? 'border-red-100' : 'border-gray-50'} rounded-2xl text-sm font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all`}
            />
          </div>
          {errors.email && <p className="text-[10px] font-bold text-red-500 mt-1 ml-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-[10px] font-black text-gray-900 uppercase tracking-widest mb-1.5 ml-1">Username</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-900 transition-colors">
              <User size={18} />
            </div>
            <input 
              {...register('username')}
              type="text" 
              placeholder="Buat username"
              className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 ${errors.username ? 'border-red-100' : 'border-gray-50'} rounded-2xl text-sm font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all`}
            />
          </div>
          {errors.username && <p className="text-[10px] font-bold text-red-500 mt-1 ml-1">{errors.username.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black text-gray-900 uppercase tracking-widest mb-1.5 ml-1">Password</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-900 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                {...register('password')}
                type={showPassword ? 'text' : 'password'} 
                placeholder="Buat password"
                className={`w-full pl-11 pr-11 py-3.5 bg-gray-50 border-2 ${errors.password ? 'border-red-100' : 'border-gray-50'} rounded-2xl text-sm font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all`}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-[10px] font-bold text-red-500 mt-1 ml-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-900 uppercase tracking-widest mb-1.5 ml-1">Konfirmasi Password</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-900 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'} 
                placeholder="Ulangi password"
                className={`w-full pl-11 pr-11 py-3.5 bg-gray-50 border-2 ${errors.confirmPassword ? 'border-red-100' : 'border-gray-50'} rounded-2xl text-sm font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all`}
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-[10px] font-bold text-red-500 mt-1 ml-1">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-2 cursor-pointer group">
            <input 
              {...register('agreeTerms')}
              type="checkbox" 
              className="mt-0.5 w-5 h-5 rounded-lg border-2 border-gray-200 text-blue-900 focus:ring-0 cursor-pointer"
            />
            <span className="text-xs font-bold text-gray-500 group-hover:text-gray-900 transition-colors leading-relaxed">
              Saya setuju dengan <Link to="/terms" className="text-blue-600 font-black">Syarat & Ketentuan</Link> dan <Link to="/privacy" className="text-blue-600 font-black">Kebijakan Privasi</Link>
            </span>
          </label>
          {errors.agreeTerms && <p className="text-[10px] font-bold text-red-500 mt-1 ml-1">{errors.agreeTerms.message}</p>}
        </div>

        <button 
          type="submit"
          disabled={registerMutation.isLoading}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-2xl text-sm font-black transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 group disabled:opacity-70 mt-4"
        >
          {registerMutation.isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
              Daftar
            </>
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm font-bold text-gray-500">
        Sudah punya akun? <Link to="/login" className="text-blue-600 font-black hover:text-blue-800">Masuk di sini</Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
