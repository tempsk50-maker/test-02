import React, { useState, useRef, useEffect } from 'react';
import { Loader2, Sparkles, Smartphone, CheckCircle2, Copy, RefreshCcw, ChevronDown, ChevronUp, Image as ImageIcon, X } from 'lucide-react';
import { NewsCardCanvas } from './NewsCardCanvas';
import { processNewsText } from '../services/geminiService';
import { NewsCardTemplate } from '../types';

declare const html2canvas: any;

const NewsCardGenerator = ({ customLogo, cardType = 'news' }: any) => {
  const [inputText, setInputText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState({ headline: '', body: '', caption: '' });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [template, setTemplate] = useState<NewsCardTemplate>(cardType === 'quote' ? 'bk-quote-block-red' : 'bk-classic-center');
  const [isManual, setIsManual] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
     setTemplate(cardType === 'quote' ? 'bk-quote-block-red' : 'bk-classic-center');
     setData({ headline: '', body: '', caption: '' });
  }, [cardType]);

  const handleGenerate = async () => {
    if (!inputText) return;
    setIsProcessing(true);
    try {
      const result = await processNewsText(inputText, cardType);
      setData(result);
    } catch (e: any) {
       alert("Error generating content");
    } finally { setIsProcessing(false); }
  };

  const handleMobileSave = async () => {
    if (!cardRef.current) return;
    try {
      // @ts-ignore
      const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true });
      setPreviewImage(canvas.toDataURL('image/png'));
    } catch(e) { console.error(e); }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-6">
       <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-bk-surface-dark p-4 rounded-xl shadow-sm border border-gray-100 dark:border-bk-border-dark">
             <textarea value={inputText} onChange={e => setInputText(e.target.value)} className="w-full h-24 bg-gray-50 dark:bg-bk-input-dark border border-gray-200 dark:border-bk-border-dark rounded-lg p-3 text-sm dark:text-white" placeholder="নিউজ বা উক্তি লিখুন..."></textarea>
             <button onClick={handleGenerate} disabled={isProcessing} className="w-full mt-3 py-2.5 bg-bk-green text-white rounded-lg font-bold flex items-center justify-center gap-2">{isProcessing ? <Loader2 className="animate-spin"/> : <Sparkles size={16}/>} জেনারেট করুন</button>
          </div>

          <div className="bg-white dark:bg-bk-surface-dark rounded-xl border border-gray-100 dark:border-bk-border-dark">
             <button onClick={() => setIsManual(!isManual)} className="w-full p-3 flex justify-between items-center text-xs font-bold text-gray-500"><span>ম্যানুয়াল এডিট</span>{isManual ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}</button>
             {isManual && (
                <div className="p-3 pt-0 space-y-2">
                   <input value={data.headline} onChange={e=>setData({...data, headline: e.target.value})} className="w-full p-2 bg-gray-50 dark:bg-bk-input-dark border rounded text-sm dark:text-white dark:border-bk-border-dark" placeholder="হেডলাইন"/>
                   <input value={data.body} onChange={e=>setData({...data, body: e.target.value})} className="w-full p-2 bg-gray-50 dark:bg-bk-input-dark border rounded text-sm dark:text-white dark:border-bk-border-dark" placeholder="বডি"/>
                   <label className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-bk-input-dark border rounded cursor-pointer dark:text-gray-400 dark:border-bk-border-dark"><ImageIcon size={14}/> ছবি আপলোড <input type="file" className="hidden" onChange={e => e.target.files?.[0] && setImages([URL.createObjectURL(e.target.files[0])])}/></label>
                </div>
             )}
          </div>
       </div>

       <div className="lg:col-span-8 space-y-4">
          <div className="w-full bg-gray-200 dark:bg-black/40 rounded-xl flex justify-center items-center p-4 overflow-hidden min-h-[400px]">
              <div className="scale-[0.5] sm:scale-[0.6] md:scale-[0.8] origin-center">
                 <div ref={cardRef}><NewsCardCanvas headline={data.headline} body={data.body} images={images} customLogo={customLogo} template={template} isQuote={cardType==='quote'} /></div>
              </div>
          </div>
          <button onClick={handleMobileSave} className="w-full py-3 bg-bk-green text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"><Smartphone size={18}/> সেভ (অ্যাপ মোড)</button>
          {data.caption && <div className="p-4 bg-white dark:bg-bk-surface-dark rounded-xl border dark:border-bk-border-dark text-sm dark:text-gray-300 relative"><button onClick={() => navigator.clipboard.writeText(data.caption||'')} className="absolute top-2 right-2 p-1 bg-gray-100 dark:bg-white/10 rounded"><Copy size={14}/></button>{data.caption}</div>}
       </div>

       {previewImage && (
         <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4">
            <button onClick={() => setPreviewImage(null)} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full text-white"><X/></button>
            <img src={previewImage} className="max-h-[80vh] rounded mb-4"/>
            <div className="px-6 py-2 bg-bk-green text-white rounded-full font-bold animate-bounce text-sm">ছবিতে ট্যাপ করে ধরে সেভ করুন</div>
         </div>
       )}
    </div>
  );
};
export default NewsCardGenerator;