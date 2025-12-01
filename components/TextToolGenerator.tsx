import React, { useState } from 'react';
import { Loader2, Sparkles, Copy, CheckCircle2 } from 'lucide-react';
import { processTextTool } from '../services/geminiService';

const TextToolGenerator = ({ toolType }: any) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGen = async () => {
     if(!input) return;
     setLoading(true);
     try {
        const res = await processTextTool(input, toolType);
        setOutput(res);
     } catch(e: any) {
        console.error(e);
     } finally { setLoading(false); }
  };

  return (
     <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-bk-surface-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-bk-border-dark">
           <h2 className="text-xl font-bold dark:text-white mb-4 capitalize">{toolType.replace('-', ' ')}</h2>
           <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full h-64 p-4 rounded-xl bg-gray-50 dark:bg-bk-input-dark border border-gray-200 dark:border-bk-border-dark dark:text-white" placeholder="টেক্সট পেস্ট করুন..."></textarea>
           <button onClick={handleGen} disabled={loading} className="w-full mt-4 py-3 bg-bk-green text-white rounded-xl font-bold flex items-center justify-center gap-2">{loading ? <Loader2 className="animate-spin"/> : <Sparkles/>} জেনারেট</button>
        </div>
        <div className="bg-white dark:bg-bk-surface-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-bk-border-dark min-h-[400px]">
           {output ? (
              <div className="prose dark:prose-invert">
                 <h3 className="font-bold mb-4 flex items-center gap-2">ফলাফল <Copy size={16} className="cursor-pointer" onClick={() => navigator.clipboard.writeText(JSON.stringify(output,null,2))}/></h3>
                 <pre className="whitespace-pre-wrap bg-gray-50 dark:bg-black/20 p-4 rounded-xl text-sm font-bengali">{output.mainContent || output.fbCaption || JSON.stringify(output, null, 2)}</pre>
              </div>
           ) : <div className="flex items-center justify-center h-full text-gray-400">ফলাফল এখানে আসবে</div>}
        </div>
     </div>
  );
};
export default TextToolGenerator;