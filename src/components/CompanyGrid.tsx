import { TrendingDown } from "lucide-react";
import { CompanyCard } from "./CompanyCard";
import { DeadCompany } from "@/types/DeadCompany";

interface CompanyGridProps {
  companies: DeadCompany[];
}

export const CompanyGrid = ({ companies }: CompanyGridProps) => {
  if (companies.length === 0) {
    return (
      <div className="text-center py-12">
        <TrendingDown className="h-12 w-12 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-400 mb-2">No companies found</h3>
        <p className="text-gray-500">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};