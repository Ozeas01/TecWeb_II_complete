import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Key, GraduationCap, Briefcase } from 'lucide-react';
import type { UserRole, UserData } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserData) => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<UserRole>('aluno');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [identifier, setIdentifier] = useState(''); // Matrícula ou ID

  // Simple local login simulation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login or register
    const user: UserData = {
      name: mode === 'register' ? name : (email.split('@')[0] || 'Usuário'),
      role: role,
      identifier: identifier || '000000',
    };
    onLogin(user);
    onClose();
  };

  // Reset state when mode changes
  const handleModeChange = (newMode: 'login' | 'register') => {
    setMode(newMode);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="bg-white rounded-[32px] border border-slate-200 p-8 sm:p-10 max-w-md w-full shadow-2xl relative z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                {mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
              </h2>
              <p className="text-slate-500 text-sm font-semibold">
                {mode === 'login' ? 'Acesse sua conta para continuar' : 'Junte-se à plataforma WebLearning'}
              </p>
            </div>

            {/* Toggle Mode */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
              <button
                type="button"
                onClick={() => handleModeChange('login')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                  mode === 'login' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('register')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                  mode === 'register' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Cadastrar
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {mode === 'register' && (
                <>
                  {/* Role Selector */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => setRole('aluno')}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        role === 'aluno' 
                          ? 'border-blue-500 bg-blue-50 text-blue-600' 
                          : 'border-slate-200 hover:border-blue-200 text-slate-500'
                      }`}
                    >
                      <GraduationCap className="h-6 w-6 mb-2" />
                      <span className="font-bold text-sm">Sou Aluno</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('professor')}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        role === 'professor' 
                          ? 'border-blue-500 bg-blue-50 text-blue-600' 
                          : 'border-slate-200 hover:border-blue-200 text-slate-500'
                      }`}
                    >
                      <Briefcase className="h-6 w-6 mb-2" />
                      <span className="font-bold text-sm">Sou Professor</span>
                    </button>
                  </div>

                  {/* Name Input */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Nome completo"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>

                  {/* Identifier (Matrícula/ID) */}
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder={role === 'aluno' ? 'Número de Matrícula' : 'ID do Professor'}
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="Seu email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  placeholder="Sua senha"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              {mode === 'login' && (
                <div className="text-right">
                  <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                    Esqueceu a senha?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                {mode === 'login' ? 'Entrar na Plataforma' : 'Criar Conta'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
