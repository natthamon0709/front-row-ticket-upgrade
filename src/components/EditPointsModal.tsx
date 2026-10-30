import React, { useState } from 'react';
import { Award, X, Sparkles } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface Props {
  entryId: string;
  currentPoints: number;
  onSave: (newPoints: number) => void;
  onClose: () => void;
  lang: Language;
}

export const EditPointsModal: React.FC<Props> = ({
  entryId,
  currentPoints,
  onSave,
  onClose,
  lang,
}) => {
  const t = translations[lang];
  const [points, setPoints] = useState<number>(currentPoints);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(points);
    onClose();
  };

  const addPreset = (delta: number) => {
    setPoints((prev) => Math.max(0, prev + delta));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white border border-amber-300 rounded-3xl w-full max-w-sm p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition p-1 rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-lg">{t.editPointsTitle}</h3>
            <p className="text-xs font-mono font-bold text-amber-700">Queue ID: {entryId}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {t.loyaltyPoints} ({t.pts})
            </label>
            <input
              type="number"
              min={0}
              max={100000}
              value={points}
              onChange={(e) => setPoints(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold text-base focus:outline-none focus:border-amber-500 focus:bg-white shadow-inner"
            />
            
            {/* Quick preset chips */}
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="text-[11px] text-slate-500 font-medium mr-1">Quick Add:</span>
              {[50, 100, 200, 500].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => addPreset(val)}
                  className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 border border-slate-200 hover:border-amber-300 transition"
                >
                  +{val}
                </button>
              ))}
            </div>

            <p className="text-[11px] text-slate-600 mt-3 leading-relaxed bg-amber-50/70 p-3 rounded-xl border border-amber-200 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{t.editPointsDesc}</span>
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition active:scale-95"
            >
              {t.saveAndRecalc}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
