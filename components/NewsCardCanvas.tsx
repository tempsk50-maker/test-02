import React, { forwardRef } from 'react';
import { Quote } from 'lucide-react';

export const NewsCardCanvas = forwardRef(({ headline, body, images, customLogo, template, isQuote }: any, ref: any) => {
  const date = new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });
  const image = images?.[0];

  const Brand = ({ variant = 'colored' }) => (
     <div className="flex items-center gap-2">
        <div className="font-oswald font-bold text-2xl tracking-tighter text-bk-green bg-white border border-bk-green px-1 rounded">bk</div>
        <div className="flex flex-col">
           <span className={`font-bold text-lg leading-none ${variant === 'dark' ? 'text-white' : 'text-bk-green'}`}>বাঁশের<span className="text-bk-red">কেল্লা</span></span>
           <span className={`text-[8px] uppercase tracking-widest opacity-70 ${variant === 'dark' ? 'text-white' : 'text-bk-green'}`}>News Media</span>
        </div>
     </div>
  );

  const style = { width: '600px', height: isQuote ? '750px' : '600px', backgroundColor: 'white', position: 'relative' as any, overflow: 'hidden' };

  if (template === 'bk-quote-block-red' || isQuote) {
     return (
        <div ref={ref} style={style} className="flex">
           <div className="w-[65%] h-full bg-bk-red p-10 flex flex-col text-white relative">
              <Quote size={60} className="opacity-30 mb-6"/>
              <h1 className="text-4xl font-bold leading-tight relative z-10">{headline || "উক্তি এখানে..."}</h1>
              <div className="mt-auto pt-6 border-t border-white/20 font-bold text-sm">{date}</div>
           </div>
           <div className="w-[35%] bg-gray-100 flex flex-col items-center py-10 relative">
              <Brand/>
              <div className="mt-auto text-center z-10">
                 <h2 className="text-xl font-bold text-gray-900">{body?.split(',')[0] || "নাম"}</h2>
                 <p className="text-sm text-gray-500">{body?.split(',')[1] || "পদবী"}</p>
              </div>
              <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-52 h-52 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200">
                 {image && <img src={image} className="w-full h-full object-cover"/>}
              </div>
           </div>
        </div>
     );
  }

  // Classic News
  return (
     <div ref={ref} style={style} className="flex flex-col p-8">
        <div className="h-64 bg-gray-200 rounded-lg overflow-hidden mb-6 relative">
           {image && <img src={image} className="w-full h-full object-cover"/>}
           <div className="absolute top-0 left-0 bg-bk-red text-white px-3 py-1 text-xs font-bold">ব্রেকিং নিউজ</div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{headline || "সংবাদ শিরোনাম"}</h1>
        <p className="text-gray-600 line-clamp-3">{body}</p>
        <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center">
           <span className="text-gray-500 font-bold text-sm">{date}</span>
           <Brand/>
        </div>
     </div>
  );
});