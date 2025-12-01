import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2, Image } from 'lucide-react';

const StorageManager = ({ isOpen, onClose, onSelect }: any) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
     const saved = localStorage.getItem('bk_gallery');
     if(saved) setItems(JSON.parse(saved));
  }, [isOpen]);

  const handleUpload = (e: any) => {
     const file = e.target.files[0];
     if(file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
           const newItem = { id: Date.now(), data: ev.target?.result };
           const updated = [newItem, ...items];
           setItems(updated);
           localStorage.setItem('bk_gallery', JSON.stringify(updated));
        };
        reader.readAsDataURL(file);
     }
  };

  if(!isOpen) return null;

  return (
     <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-bk-surface-dark w-full max-w-2xl rounded-2xl p-6 h-[80vh] flex flex-col">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold dark:text-white">গ্যালারি</h2>
              <button onClick={onClose}><X className="dark:text-white"/></button>
           </div>
           <div className="flex-1 overflow-y-auto grid grid-cols-3 gap-4 p-2">
              <label className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-white/5 aspect-square">
                 <Upload className="dark:text-gray-400"/>
                 <span className="text-xs mt-2 dark:text-gray-400">আপলোড</span>
                 <input type="file" className="hidden" onChange={handleUpload}/>
              </label>
              {items.map(item => (
                 <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden border dark:border-gray-700 group">
                    <img src={item.data} className="w-full h-full object-contain bg-gray-100 dark:bg-black/20"/>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                       <button onClick={() => { onSelect(item.data); onClose(); }} className="p-2 bg-green-500 text-white rounded-full"><Image size={16}/></button>
                       <button onClick={() => {
                          const updated = items.filter(i => i.id !== item.id);
                          setItems(updated);
                          localStorage.setItem('bk_gallery', JSON.stringify(updated));
                       }} className="p-2 bg-red-500 text-white rounded-full"><Trash2 size={16}/></button>
                    </div>
                 </div>
              ))}
           </div>
        </div>
     </div>
  );
};
export default StorageManager;