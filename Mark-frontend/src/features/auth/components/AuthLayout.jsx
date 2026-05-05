import React from 'react';

const AuthLayout = ({ children, illustration }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Patterns */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      {/* Decorative Dots */}
      <div className="absolute top-20 right-20 grid grid-cols-4 gap-2 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
        ))}
      </div>
      <div className="absolute bottom-20 left-20 grid grid-cols-4 gap-2 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
        ))}
      </div>

      <div className={`bg-white rounded-[32px] shadow-2xl shadow-blue-900/5 border border-white flex overflow-hidden relative z-10 ${illustration ? 'max-w-6xl w-full min-h-[700px]' : 'max-w-xl w-full'}`}>
        <div className={`flex-1 p-12 flex flex-col justify-center ${illustration ? 'w-1/2' : 'w-full'}`}>
          {children}
        </div>
        
        {illustration && (
          <div className="hidden lg:flex flex-1 bg-gray-50/50 p-12 items-center justify-center relative">
            <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-transparent" />
            <div className="relative z-10 w-full max-w-lg">
              {/* Illustration Mockup Simulation */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 rotate-2">
                 <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                 </div>
                 <div className="space-y-4">
                    <div className="h-32 bg-gray-50 rounded-xl flex items-end p-4 gap-2">
                       <div className="w-full bg-blue-100 h-[20%]" />
                       <div className="w-full bg-blue-200 h-[40%]" />
                       <div className="w-full bg-blue-400 h-[80%]" />
                       <div className="w-full bg-blue-300 h-[60%]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="h-20 bg-gray-50 rounded-xl" />
                       <div className="h-20 bg-gray-50 rounded-xl" />
                    </div>
                 </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-100/50 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100/50 rounded-full blur-2xl" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
