
import { useState, useMemo } from "react";
import { Search, TrendingDown, Calendar, Building2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DeadCompany {
  id: number;
  name: string;
  batch: string;
  year: number;
  description: string;
  reason: string;
  category: string;
  founded: number;
  shutdownYear: number;
  funding: string;
}

const deadCompanies: DeadCompany[] = [
  {
    id: 1,
    name: "Homejoy",
    batch: "S10",
    year: 2010,
    description: "On-demand home cleaning service",
    reason: "Legal issues with worker classification, high customer acquisition costs, and operational complexity",
    category: "On-demand Services",
    founded: 2010,
    shutdownYear: 2015,
    funding: "$64M"
  },
  {
    id: 2,
    name: "Secret",
    batch: "S12",
    year: 2012,
    description: "Anonymous social sharing app",
    reason: "Toxic community culture, cyberbullying issues, and inability to moderate content effectively",
    category: "Social Media",
    founded: 2013,
    shutdownYear: 2015,
    funding: "$35M"
  },
  {
    id: 3,
    name: "Zirtual",
    batch: "S11",
    year: 2011,
    description: "Virtual assistant service for busy professionals",
    reason: "Cash flow crisis, mismanagement of contractor payments, and scaling challenges",
    category: "Productivity",
    founded: 2011,
    shutdownYear: 2015,
    funding: "$5.5M"
  },
  {
    id: 4,
    name: "Yik Yak",
    batch: "S13",
    year: 2013,
    description: "Anonymous location-based social media app",
    reason: "Cyberbullying, harassment issues, declining user engagement, and inability to monetize",
    category: "Social Media",
    founded: 2013,
    shutdownYear: 2017,
    funding: "$73.5M"
  },
  {
    id: 5,
    name: "Rdio",
    batch: "S08",
    year: 2008,
    description: "Music streaming service",
    reason: "Intense competition with Spotify and Apple Music, high licensing costs, inability to scale",
    category: "Entertainment",
    founded: 2008,
    shutdownYear: 2015,
    funding: "$125M"
  },
  {
    id: 6,
    name: "Quirky",
    batch: "S09",
    year: 2009,
    description: "Crowdsourced product development platform",
    reason: "Complex business model, high operational costs, difficulty in product-market fit",
    category: "Hardware",
    founded: 2009,
    shutdownYear: 2015,
    funding: "$185M"
  },
  {
    id: 7,
    name: "Leap Transit",
    batch: "S13",
    year: 2013,
    description: "Premium bus service in San Francisco",
    reason: "Regulatory challenges, legal battles with city officials, unsustainable unit economics",
    category: "Transportation",
    founded: 2013,
    shutdownYear: 2015,
    funding: "$3M"
  },
  {
    id: 8,
    name: "Tutorspree",
    batch: "S11",
    year: 2011,
    description: "Online tutoring marketplace",
    reason: "High customer acquisition costs, low retention rates, competitive market dynamics",
    category: "Education",
    founded: 2011,
    shutdownYear: 2013,
    funding: "$2.1M"
  },
  {
    id: 9,
    name: "Floow2",
    batch: "S12",
    year: 2012,
    description: "Social sharing platform for digital content",
    reason: "Failed to achieve product-market fit, low user engagement, pivot unsuccessful",
    category: "Social Media",
    founded: 2012,
    shutdownYear: 2014,
    funding: "$1.5M"
  },
  {
    id: 10,
    name: "Cake Health",
    batch: "S08",
    year: 2008,
    description: "Healthcare benefits management platform",
    reason: "Complex healthcare regulations, slow enterprise sales cycles, pivot to acquisition",
    category: "Healthcare",
    founded: 2008,
    shutdownYear: 2016,
    funding: "$10.5M"
  },
  {
    id: 11,
    name: "Color",
    batch: "S11",
    year: 2011,
    description: "Photo sharing app with automatic organization",
    reason: "Poor user adoption, confusing user experience, failed to differentiate from Instagram",
    category: "Social Media",
    founded: 2011,
    shutdownYear: 2012,
    funding: "$41M"
  },
  {
    id: 12,
    name: "Everpix",
    batch: "S11",
    year: 2011,
    description: "AI-powered photo storage and organization service",
    reason: "Unsustainable unit economics, high storage costs, inability to scale revenue model",
    category: "Consumer Software",
    founded: 2011,
    shutdownYear: 2013,
    funding: "$2.3M"
  },
  {
    id: 13,
    name: "Prim",
    batch: "S12",
    year: 2012,
    description: "Curated shopping platform for home goods",
    reason: "High customer acquisition costs, inventory management challenges, market timing issues",
    category: "E-commerce",
    founded: 2012,
    shutdownYear: 2014,
    funding: "$4.1M"
  },
  {
    id: 14,
    name: "Karma",
    batch: "S11",
    year: 2011,
    description: "Social gifting platform for group purchases",
    reason: "Complex user flows, low repeat usage, difficulty monetizing social gifting",
    category: "E-commerce",
    founded: 2011,
    shutdownYear: 2014,
    funding: "$8.5M"
  },
  {
    id: 15,
    name: "Plancast",
    batch: "S09",
    year: 2009,
    description: "Event discovery and planning social network",
    reason: "Low user engagement, failed to achieve viral growth, competition from Facebook Events",
    category: "Social Media",
    founded: 2009,
    shutdownYear: 2012,
    funding: "$4.8M"
  },
  {
    id: 16,
    name: "Greplin",
    batch: "W10",
    year: 2010,
    description: "Personal search engine for social media and email",
    reason: "Privacy concerns, API restrictions from major platforms, pivot attempts failed",
    category: "Productivity",
    founded: 2010,
    shutdownYear: 2013,
    funding: "$7.5M"
  },
  {
    id: 17,
    name: "DailyBooth",
    batch: "S09",
    year: 2009,
    description: "Daily photo sharing social network",
    reason: "Declining user engagement, failed mobile transition, competition from Instagram",
    category: "Social Media",
    founded: 2009,
    shutdownYear: 2012,
    funding: "$8.2M"
  },
  {
    id: 18,
    name: "Backtype",
    batch: "S08",
    year: 2008,
    description: "Social media analytics and conversation tracking",
    reason: "Acquired by Twitter but original product discontinued, team integration challenges",
    category: "Analytics",
    founded: 2008,
    shutdownYear: 2014,
    funding: "$7.1M"
  },
  {
    id: 19,
    name: "Cuil",
    batch: "S08",
    year: 2008,
    description: "Search engine attempting to compete with Google",
    reason: "Poor search quality, massive infrastructure costs, impossible competition with Google",
    category: "Search",
    founded: 2008,
    shutdownYear: 2010,
    funding: "$33M"
  },
  {
    id: 20,
    name: "Kiko",
    batch: "S05",
    year: 2005,
    description: "Web-based calendar application",
    reason: "Launched before market was ready, competition from Google Calendar, poor timing",
    category: "Productivity",
    founded: 2005,
    shutdownYear: 2006,
    funding: "$0.25M"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBatch, setSelectedBatch] = useState("all");

  const categories = [...new Set(deadCompanies.map(company => company.category))];
  const batches = [...new Set(deadCompanies.map(company => company.batch))].sort();

  const filteredCompanies = useMemo(() => {
    return deadCompanies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.reason.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || company.category === selectedCategory;
      const matchesBatch = selectedBatch === "all" || company.batch === selectedBatch;
      
      return matchesSearch && matchesCategory && matchesBatch;
    });
  }, [searchTerm, selectedCategory, selectedBatch]);

  const totalFunding = deadCompanies.reduce((acc, company) => {
    const funding = parseFloat(company.funding.replace(/[^0-9.]/g, ''));
    return acc + funding;
  }, 0);

  const averageLifespan = deadCompanies.reduce((acc, company) => {
    return acc + (company.shutdownYear - company.founded);
  }, 0) / deadCompanies.length;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
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
                <div className="text-3xl font-bold text-red-400">{deadCompanies.length}</div>
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

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search companies, reasons, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Batch" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">All Batches</SelectItem>
                {batches.map(batch => (
                  <SelectItem key={batch} value={batch}>{batch}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredCompanies.length} of {deadCompanies.length} companies
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-white text-xl">{company.name}</CardTitle>
                  <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                    {company.batch}
                  </Badge>
                </div>
                <CardDescription className="text-gray-300">
                  {company.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-400">
                    <Building2 className="h-4 w-4 mr-2" />
                    <span>{company.category}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{company.founded} - {company.shutdownYear} • {company.funding} raised</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-red-400 flex-shrink-0" />
                    <span className="text-gray-300">{company.reason}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <TrendingDown className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No companies found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            Data compiled from public sources. This site is for educational purposes to help entrepreneurs learn from failures.
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            "Failure is simply the opportunity to begin again, this time more intelligently." - Henry Ford
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
