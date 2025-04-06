import { LockKeyhole } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-blue-500 text-white p-2 rounded-full">
        <LockKeyhole size={24} />
      </div>
      <span className="text-xl font-bold text-blue-600">サービス名</span>
    </div>
  );
}
