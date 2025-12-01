import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import NewsCardGenerator from './components/NewsCardGenerator';
import TextToolGenerator from './components/TextToolGenerator';
import StorageManager from './components/StorageManager';
import AdminPanel from './components/AdminPanel';
import { Loader2, WifiOff, KeyRound } from 'lucide-react';
import { TextToolType } from './types';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthModal from './components/AuthModal';

function AppContent() {
  const [activeTab, setActiveTab] = useState('news-card');
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  const { user, loading, isAdmin } = useAuth();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem('bk_theme') !== 'light';
    } catch { return true; }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('bk_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    const savedLogo = localStorage.getItem('bk_custom_logo');
    if (savedLogo) setCustomLogo(savedLogo);
  }, []);

  const renderContent = () => {
    if (activeTab === 'admin-panel') return isAdmin ? <AdminPanel /> : null;

    if (['news-card', 'quote-card'].includes(activeTab)) {
       return <NewsCardGenerator customLogo={customLogo} cardType={activeTab === 'quote-card' ? 'quote' : 'news'} />;
    }
    
    return <TextToolGenerator toolType={activeTab as TextToolType} />;
  };

  return (
    <div className="min-h-screen bg-bk-bg-light dark:bg-bk-bg-dark font-bengali text-slate-800 dark:text-gray-100 pb-20 transition-colors duration-300">
      {!isOnline && (
        <div className="bg-bk-red text-white px-4 py-2 text-center text-[10px] font-bold flex items-center justify-center gap-2 sticky top-0 z-[60]">
           <WifiOff size={12} /> অফলাইন মোড
        </div>
      )}

      <TopBar activeTab={activeTab} setActiveTab={setActiveTab} onOpenGallery={() => setIsGalleryOpen(true)} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="max-w-5xl mx-auto p-2 md:p-6">
        {loading ? <div className="flex justify-center min-h-[50vh]"><Loader2 className="w-8 h-8 animate-spin text-bk-green" /></div> : renderContent()}
      </main>

      <StorageManager isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} onSelect={(d) => {setCustomLogo(d); localStorage.setItem('bk_custom_logo', d);}} />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}