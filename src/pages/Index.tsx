
import { useState, useMemo } from "react";
import { HeroSection } from "@/components/HeroSection";
import { FiltersSection } from "@/components/FiltersSection";
import { CompanyGrid } from "@/components/CompanyGrid";
import { Footer } from "@/components/Footer";
import { useCompanyData } from "@/hooks/useCompanyData";
import { allDeadCompanies } from "@/data";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBatch, setSelectedBatch] = useState("all");

  const {
    categories,
    batches,
    totalFunding,
    averageLifespan,
    filterCompanies
  } = useCompanyData(allDeadCompanies);

  const filteredCompanies = useMemo(() => {
    return filterCompanies(searchTerm, selectedCategory, selectedBatch);
  }, [searchTerm, selectedCategory, selectedBatch, filterCompanies]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <HeroSection
        totalCompanies={allDeadCompanies.length}
        totalFunding={totalFunding}
        averageLifespan={averageLifespan}
      />

      <FiltersSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedBatch={selectedBatch}
        setSelectedBatch={setSelectedBatch}
        categories={categories}
        batches={batches}
        totalResults={filteredCompanies.length}
        totalCompanies={allDeadCompanies.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-8 text-center">
          <p className="text-gray-400">
            This website was made for joking purposes and the data may not be entirely accurate as it was built entirely on Lovable - and who knows where Lovable gets their info from!
          </p>
        </div>
        <CompanyGrid companies={filteredCompanies} />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
