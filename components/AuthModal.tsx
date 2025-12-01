import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AuthModal = ({ isOpen, onClose }: any) => {
  const { signInWithGoogle } = useAuth();
  if(!isOpen) return null;
  return (
     <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-bk-surface-dark w-full max-w-sm rounded-2xl p-6 text-center">
           <button onClick={onClose} className="absolute top-4 right-4 text-gray-500"><X/></button>
           <h2 className="text-xl font-bold mb-4 dark:text-white">লগিন করুন</h2>
           <button onClick={() => { signInWithGoogle(); onClose(); }} className="w-full py-3 bg-white border rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50">
              Google দিয়ে লগিন করুন
           </button>
        </div>
     </div>
  );
};
export default AuthModal;