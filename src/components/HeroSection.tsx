import { TrendingDown } from "lucide-react";

interface HeroSectionProps {
  totalCompanies: number;
  totalFunding: number;
  averageLifespan: number;
}

export const HeroSection = ({ totalCompanies, totalFunding, averageLifespan }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-gray-900 to-indigo-900">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-red-500/20 rounded-full">
              <TrendingDown className="h-12 w-12 text-red-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            YC Dead Pool
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Learn from the failures of Y Combinator companies. Understanding why startups fail is crucial for future success.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-red-400">{totalCompanies}</div>
              <div className="text-gray-300">Failed Companies</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-orange-400">${totalFunding.toFixed(0)}M</div>
              <div className="text-gray-300">Total Funding Lost</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-yellow-400">{averageLifespan.toFixed(1)}</div>
              <div className="text-gray-300">Avg Years Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};