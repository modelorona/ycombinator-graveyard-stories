
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
    reason: "Turns out hiring strangers to clean your house is legally complicated - who could have predicted?",
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
    reason: "Anonymous apps attract trolls? Shocking! Next you'll tell me water is wet",
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
    reason: "Founders forgot to check their bank account - classic rookie mistake",
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
    reason: "College kids being mean to each other? On the internet? Unprecedented!",
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
    reason: "Thought they could beat Spotify without infinite money - adorably naive",
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
    reason: "Crowdsourcing innovation is hard when the crowd has terrible ideas",
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
    reason: "San Francisco bureaucrats crushed their hipster bus dreams - tale as old as time",
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
    reason: "Turns out Khan Academy exists and it's free - whoops!",
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
    reason: "Nobody wanted their digital sharing platform - shocking since everyone loves sharing",
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
    reason: "Healthcare is complicated? Who knew besides literally everyone",
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
    reason: "Launched a photo app when Instagram existed - genius level strategic thinking",
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
    reason: "Storing photos costs money forever, revenue happens once - groundbreaking math discovery",
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
    reason: "Curated shopping for people who can't pick their own furniture - market smaller than expected",
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
    reason: "People prefer buying gifts themselves instead of crowdfunding them - selfish jerks",
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
    reason: "Facebook Events already existed but they thought they could do it better - bold strategy",
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
    reason: "Social platforms said 'no thanks' to creepy personal search - party poopers",
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
    reason: "Daily selfies got boring fast - who could have seen that coming?",
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
    reason: "Twitter bought them just to shut them down - corporate murder in broad daylight",
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
    reason: "Thought they could beat Google at search with $33M - adorable optimism",
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
    reason: "Google crushed them like a bug with Google Calendar - David vs Goliath went predictably",
    category: "Productivity",
    founded: 2005,
    shutdownYear: 2006,
    funding: "$0.25M"
  },
  {
    id: 21,
    name: "Stitch Technologies",
    batch: "S15",
    year: 2015,
    description: "Financial data integration platform for businesses",
    reason: "Founders couldn't figure out why banks don't like sharing data - shocking!",
    category: "FinTech",
    founded: 2015,
    shutdownYear: 2019,
    funding: "$12M"
  },
  {
    id: 22,
    name: "99dresses",
    batch: "W12",
    year: 2012,
    description: "Fashion sharing platform for women's clothing",
    reason: "Turns out women don't actually want to share their favorite dresses with strangers",
    category: "Fashion",
    founded: 2012,
    shutdownYear: 2014,
    funding: "$2.5M"
  },
  {
    id: 23,
    name: "Aalo",
    batch: "W18",
    year: 2018,
    description: "Lego-like furniture for design geeks",
    reason: "Adults realized they're not actually kids and don't want furniture that looks like toys",
    category: "Furniture",
    founded: 2018,
    shutdownYear: 2020,
    funding: "$1.2M"
  },
  {
    id: 24,
    name: "Abundance Labs",
    batch: "S16",
    year: 2016,
    description: "Alternative currency marketplace businesses",
    reason: "Cryptocurrency bros thought they could reinvent money - spoiler alert: they couldn't",
    category: "FinTech",
    founded: 2016,
    shutdownYear: 2018,
    funding: "$3.8M"
  },
  {
    id: 25,
    name: "Airshared",
    batch: "S12",
    year: 2012,
    description: "Peer-to-peer bike sharing platform",
    reason: "People were too paranoid to let strangers borrow their bikes - imagine that!",
    category: "Transportation",
    founded: 2012,
    shutdownYear: 2014,
    funding: "$1.8M"
  },
  {
    id: 26,
    name: "Aisle50",
    batch: "S11",
    year: 2011,
    description: "Digital grocery coupons and deals",
    reason: "Grandmas still preferred clipping physical coupons from newspapers like savages",
    category: "E-commerce",
    founded: 2011,
    shutdownYear: 2013,
    funding: "$4.2M"
  },
  {
    id: 27,
    name: "Loopt",
    batch: "S05",
    year: 2005,
    description: "Location-based social networking service",
    reason: "Creepy stalker vibes scared users away before privacy became cool to worry about",
    category: "Social Media",
    founded: 2005,
    shutdownYear: 2012,
    funding: "$30M"
  },
  {
    id: 28,
    name: "Buxfer",
    batch: "S06",
    year: 2006,
    description: "Personal finance management and expense tracking",
    reason: "People prefer living in financial denial rather than facing their spending habits",
    category: "FinTech",
    founded: 2006,
    shutdownYear: 2018,
    funding: "$2.1M"
  },
  {
    id: 30,
    name: "Parakey",
    batch: "S06",
    year: 2006,
    description: "Web-based desktop replacement platform",
    reason: "Tried to replace Windows with a website - even more delusional than it sounds",
    category: "Software",
    founded: 2006,
    shutdownYear: 2007,
    funding: "$1.5M"
  },
  {
    id: 31,
    name: "Clickpass",
    batch: "S08",
    year: 2008,
    description: "Single sign-on authentication service",
    reason: "Users were too stupid to remember one password instead of twenty",
    category: "Security",
    founded: 2008,
    shutdownYear: 2010,
    funding: "$2.8M"
  },
  {
    id: 32,
    name: "Etacts",
    batch: "S10",
    year: 2010,
    description: "Automated contact management and CRM",
    reason: "People realized they don't actually want to be organized or productive",
    category: "Productivity",
    founded: 2010,
    shutdownYear: 2012,
    funding: "$3.2M"
  },
  {
    id: 33,
    name: "Singly",
    batch: "S11",
    year: 2011,
    description: "API platform for social data aggregation",
    reason: "Social networks built walls faster than these guys could climb them",
    category: "Developer Tools",
    founded: 2011,
    shutdownYear: 2013,
    funding: "$6.2M"
  },
  {
    id: 34,
    name: "MindMeld",
    batch: "S11",
    year: 2011,
    description: "Real-time conversation enhancement platform",
    reason: "Turns out people don't want AI telling them what to say in conversations",
    category: "AI/ML",
    founded: 2011,
    shutdownYear: 2017,
    funding: "$15.2M"
  },
  {
    id: 35,
    name: "Postini",
    batch: "S99",
    year: 1999,
    description: "Email security and archiving services",
    reason: "Google bought them and then slowly murdered their soul",
    category: "Security",
    founded: 1999,
    shutdownYear: 2013,
    funding: "$45M"
  },
  {
    id: 36,
    name: "Songkick",
    batch: "S07",
    year: 2007,
    description: "Concert discovery and ticketing platform",
    reason: "Music fans preferred overpriced Ticketmaster fees to a reasonable alternative",
    category: "Entertainment",
    founded: 2007,
    shutdownYear: 2017,
    funding: "$25M"
  },
  {
    id: 37,
    name: "Leftronic",
    batch: "S10",
    year: 2010,
    description: "Real-time business dashboard software",
    reason: "CEOs got bored staring at pretty charts that didn't magically fix their companies",
    category: "Analytics",
    founded: 2010,
    shutdownYear: 2016,
    funding: "$2.1M"
  },
  {
    id: 38,
    name: "Baydin",
    batch: "S10",
    year: 2010,
    description: "Email productivity and scheduling tools",
    reason: "Email remains a dumpster fire that no amount of AI can fix",
    category: "Productivity",
    founded: 2010,
    shutdownYear: 2018,
    funding: "$8.5M"
  },
  {
    id: 39,
    name: "MyGengo",
    batch: "S09",
    year: 2009,
    description: "Crowdsourced human translation platform",
    reason: "Google Translate got good enough that humans became obsolete",
    category: "Language",
    founded: 2009,
    shutdownYear: 2019,
    funding: "$18.5M"
  },
  {
    id: 40,
    name: "Appjet",
    batch: "S07",
    year: 2007,
    description: "Real-time collaborative web applications",
    reason: "Google hired the founders and let the product die a slow, painful death",
    category: "Developer Tools",
    founded: 2007,
    shutdownYear: 2009,
    funding: "$1.2M"
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
