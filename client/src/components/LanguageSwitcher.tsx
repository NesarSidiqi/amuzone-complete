// LanguageSwitcher.tsx - Language toggle component

import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-[#F5F0EB] rounded-lg p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all font-body ${
          language === 'en'
            ? 'bg-white text-[#E8700A] shadow-sm'
            : 'text-gray-600 hover:text-[#E8700A]'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('fa')}
        className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all font-body ${
          language === 'fa'
            ? 'bg-white text-[#E8700A] shadow-sm'
            : 'text-gray-600 hover:text-[#E8700A]'
        }`}
      >
        دری
      </button>
    </div>
  );
}
