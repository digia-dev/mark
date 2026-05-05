import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogin } from '../hooks/use-auth';
import { LogIn, Loader2, AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: login, isLoading, error } = useLogin();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
      <div className="flex flex-col items-center mb-8">
        <div className="p-3 bg-blue-600 rounded-xl mb-4 shadow-lg shadow-blue-200">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Selamat Datang</h1>
        <p className="text-slate-500">Silakan masuk ke akun Mark Anda</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <input
            type="email"
            {...register('email')}
            className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-200'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none`}
            placeholder="admin@rapidmark.co.id"
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" /> {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
          <input
            type="password"
            {...register('password')}
            className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.password ? 'border-red-500' : 'border-slate-200'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" /> {errors.password.message}
            </p>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error.response?.data?.error?.message || 'Gagal masuk, silakan coba lagi'}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-200 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Memproses...
            </>
          ) : (
            'Masuk ke Dashboard'
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-sm text-slate-500">
          Lupa password? <a href="#" className="text-blue-600 font-medium hover:underline">Hubungi Admin</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
