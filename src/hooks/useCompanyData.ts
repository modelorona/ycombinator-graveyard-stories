import { useMemo } from "react";
import { DeadCompany } from "@/types/DeadCompany";

export const useCompanyData = (companies: DeadCompany[]) => {
  const categories = useMemo(() => {
    return [...new Set(companies.map(company => company.category))];
  }, [companies]);

  const batches = useMemo(() => {
    return [...new Set(companies.map(company => company.batch))].sort();
  }, [companies]);

  const totalFunding = useMemo(() => {
    return companies.reduce((acc, company) => {
      const funding = parseFloat(company.funding.replace(/[^0-9.]/g, ''));
      return acc + funding;
    }, 0);
  }, [companies]);

  const averageLifespan = useMemo(() => {
    return companies.reduce((acc, company) => {
      return acc + (company.shutdownYear - company.founded);
    }, 0) / companies.length;
  }, [companies]);

  const filterCompanies = (
    searchTerm: string,
    selectedCategory: string,
    selectedBatch: string
  ) => {
    return companies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.reason.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || company.category === selectedCategory;
      const matchesBatch = selectedBatch === "all" || company.batch === selectedBatch;
      
      return matchesSearch && matchesCategory && matchesBatch;
    });
  };

  return {
    categories,
    batches,
    totalFunding,
    averageLifespan,
    filterCompanies
  };
};