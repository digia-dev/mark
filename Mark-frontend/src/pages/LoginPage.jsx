import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useLogin } from '../features/auth/hooks/use-auth';
import AuthLayout from '../features/auth/components/AuthLayout';

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  rememberMe: z.boolean().optional()
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false }
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate('/dashboard');
      }
    });
  };

  return (
    <AuthLayout>
      <div className="mb-10 text-center lg:text-left">
        <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
          <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center rotate-12 shadow-lg shadow-blue-900/20">
            <div className="w-5 h-5 border-2 border-white rounded-sm rotate-45" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-blue-900 tracking-tight leading-none mb-0.5">Mark</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ISP Sales & Management System</p>
          </div>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-2">Selamat Datang Kembali! 👋</h1>
        <p className="text-gray-500 font-medium">Silakan masuk untuk melanjutkan ke dashboard</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2 ml-1">Email atau Username</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-900 transition-colors">
              <User size={20} />
            </div>
            <input
              {...register('email')}
              type="text"
              placeholder="Masukkan email atau username"
              className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 ${errors.email ? 'border-red-100' : 'border-gray-50'} rounded-2xl text-sm font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all`}
            />
          </div>
          {errors.email && <p className="text-[10px] font-bold text-red-500 mt-1.5 ml-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2 ml-1">Password</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-900 transition-colors">
              <Lock size={20} />
            </div>
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukkan password"
              className={`w-full pl-12 pr-12 py-4 bg-gray-50 border-2 ${errors.password ? 'border-red-100' : 'border-gray-50'} rounded-2xl text-sm font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-[10px] font-bold text-red-500 mt-1.5 ml-1">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              {...register('rememberMe')}
              type="checkbox"
              className="w-5 h-5 rounded-lg border-2 border-gray-200 text-blue-900 focus:ring-0 cursor-pointer"
            />
            <span className="text-xs font-bold text-gray-500 group-hover:text-gray-900 transition-colors">Ingat saya</span>
          </label>
          <Link to="/forgot-password" size="sm" className="text-xs font-black text-blue-600 hover:text-blue-800 transition-colors">
            Lupa password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isLoading}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-2xl text-sm font-black transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 group disabled:opacity-70"
        >
          {loginMutation.isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
              Masuk
            </>
          )}
        </button>
      </form>

      <div className="mt-8 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-widest font-black">
          <span className="bg-white px-4 text-gray-300">atau masuk dengan</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-3 py-3.5 border-2 border-gray-50 rounded-2xl hover:bg-gray-50 transition-all font-black text-xs text-gray-700">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
          Google
        </button>
        <button className="flex items-center justify-center gap-3 py-3.5 border-2 border-gray-50 rounded-2xl hover:bg-gray-50 transition-all font-black text-xs text-gray-700">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" className="w-5 h-5" alt="Microsoft" />
          Microsoft
        </button>
      </div>

      <p className="mt-10 text-center text-sm font-bold text-gray-500">
        Belum punya akun? <Link to="/register" className="text-blue-600 font-black hover:text-blue-800">Daftar sekarang</Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
