
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
  // S05 Batch
  {
    id: 1,
    name: "Infogami",
    batch: "S05",
    year: 2005,
    description: "Wiki content management platform",
    reason: "Nobody wanted yet another wiki when Wikipedia already existed - shocking revelation",
    category: "Developer Tools",
    founded: 2005,
    shutdownYear: 2007,
    funding: "$0.5M"
  },
  {
    id: 2,
    name: "Memamp",
    batch: "S05",
    year: 2005,
    description: "Memory amplification software",
    reason: "Turns out you can't actually download more RAM - who knew?",
    category: "Software",
    founded: 2005,
    shutdownYear: 2006,
    funding: "$0.3M"
  },
  {
    id: 3,
    name: "Simmery",
    batch: "S05",
    year: 2005,
    description: "Social sharing platform",
    reason: "People preferred sharing on platforms that actually worked - picky bastards",
    category: "Social Media",
    founded: 2005,
    shutdownYear: 2006,
    funding: "$0.4M"
  },
  
  // S06 Batch
  {
    id: 4,
    name: "Jamglue",
    batch: "S06",
    year: 2006,
    description: "Music remixing community",
    reason: "Lawyers scared everyone away faster than bad remixes",
    category: "Entertainment",
    founded: 2006,
    shutdownYear: 2008,
    funding: "$1.2M"
  },
  {
    id: 5,
    name: "Jumpchat",
    batch: "S06",
    year: 2006,
    description: "Video chat platform",
    reason: "Skype crushed them like a bug - David vs Goliath went predictably",
    category: "Communication",
    founded: 2006,
    shutdownYear: 2007,
    funding: "$0.8M"
  },
  {
    id: 6,
    name: "Likebetter",
    batch: "S06",
    year: 2006,
    description: "Photo comparison game",
    reason: "Turns out 'hot or not' was already taken and better executed",
    category: "Entertainment",
    founded: 2006,
    shutdownYear: 2008,
    funding: "$0.6M"
  },
  {
    id: 7,
    name: "Pollground",
    batch: "S06",
    year: 2006,
    description: "Online polling platform",
    reason: "People realized Twitter polls were free and didn't suck",
    category: "Social Media",
    founded: 2006,
    shutdownYear: 2008,
    funding: "$0.7M"
  },
  {
    id: 8,
    name: "Shoutfit",
    batch: "S06",
    year: 2006,
    description: "Fashion social platform",
    reason: "Fashion victims preferred Instagram over their janky interface",
    category: "Fashion",
    founded: 2006,
    shutdownYear: 2007,
    funding: "$0.5M"
  },
  {
    id: 9,
    name: "Talkito",
    batch: "S06",
    year: 2006,
    description: "Local chat platform",
    reason: "Creepy stranger danger vibes killed it faster than parental warnings",
    category: "Social Media",
    founded: 2006,
    shutdownYear: 2007,
    funding: "$0.4M"
  },
  {
    id: 10,
    name: "Thinkature",
    batch: "S06",
    year: 2006,
    description: "Collaborative whiteboard",
    reason: "People preferred actual whiteboards that didn't crash every 5 minutes",
    category: "Productivity",
    founded: 2006,
    shutdownYear: 2008,
    funding: "$0.9M"
  },
  {
    id: 11,
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
  
  // S07 Batch
  {
    id: 12,
    name: "Biographicon",
    batch: "S07",
    year: 2007,
    description: "Biography wiki platform",
    reason: "Wikipedia already had biographies and wasn't a confusing mess",
    category: "Entertainment",
    founded: 2007,
    shutdownYear: 2009,
    funding: "$0.8M"
  },
  {
    id: 13,
    name: "Bountii",
    batch: "S07",
    year: 2007,
    description: "Electronics price search",
    reason: "Google Shopping existed and didn't look like it was designed by blind monkeys",
    category: "E-commerce",
    founded: 2007,
    shutdownYear: 2009,
    funding: "$1.1M"
  },
  {
    id: 14,
    name: "Clickpass",
    batch: "S07",
    year: 2007,
    description: "Single sign-on authentication",
    reason: "Users were too stupid to remember one password instead of twenty",
    category: "Security",
    founded: 2007,
    shutdownYear: 2010,
    funding: "$2.8M"
  },
  {
    id: 15,
    name: "ContestMachine",
    batch: "S07",
    year: 2007,
    description: "Contest creation platform",
    reason: "Running contests turned out to be legally complicated - shocking!",
    category: "Marketing",
    founded: 2007,
    shutdownYear: 2009,
    funding: "$0.9M"
  },
  {
    id: 16,
    name: "Appjet",
    batch: "S07",
    year: 2007,
    description: "Real-time collaborative web applications",
    reason: "Google hired the founders and let the product die a slow, painful death",
    category: "Developer Tools",
    founded: 2007,
    shutdownYear: 2009,
    funding: "$1.2M"
  },
  
  // S08 Batch
  {
    id: 17,
    name: "Anyvite",
    batch: "S08",
    year: 2008,
    description: "Event invitation platform",
    reason: "Facebook Events crushed them like an ant at a corporate picnic",
    category: "Social Media",
    founded: 2008,
    shutdownYear: 2010,
    funding: "$1.5M"
  },
  {
    id: 18,
    name: "Backtype",
    batch: "S08",
    year: 2008,
    description: "Social media analytics",
    reason: "Twitter bought them just to shut them down - corporate murder in broad daylight",
    category: "Analytics",
    founded: 2008,
    shutdownYear: 2014,
    funding: "$7.1M"
  },
  {
    id: 19,
    name: "Claimspotting",
    batch: "S08",
    year: 2008,
    description: "Fact-checking platform",
    reason: "Nobody wanted facts when lies were so much more entertaining",
    category: "Media",
    founded: 2008,
    shutdownYear: 2010,
    funding: "$0.8M"
  },
  {
    id: 20,
    name: "CO2Stats",
    batch: "S08",
    year: 2008,
    description: "Environmental web analytics",
    reason: "Greenwashing went out of style faster than their carbon calculations",
    category: "Analytics",
    founded: 2008,
    shutdownYear: 2016,
    funding: "$1.2M"
  },
  {
    id: 21,
    name: "Frogmetrics",
    batch: "S08",
    year: 2008,
    description: "Customer feedback touchscreen",
    reason: "Tablets made their expensive hardware look like vintage junk",
    category: "Hardware",
    founded: 2008,
    shutdownYear: 2011,
    funding: "$2.1M"
  },
  {
    id: 22,
    name: "Job Alchemist",
    batch: "S08",
    year: 2008,
    description: "Online recruiting software",
    reason: "LinkedIn ate their lunch and served it with a smile",
    category: "HR Tech",
    founded: 2008,
    shutdownYear: 2010,
    funding: "$1.8M"
  },
  {
    id: 23,
    name: "Just Spotted",
    batch: "S08",
    year: 2008,
    description: "Celebrity spotting social network",
    reason: "Paparazzi didn't need an app to stalk celebrities - duh",
    category: "Social Media",
    founded: 2008,
    shutdownYear: 2009,
    funding: "$0.9M"
  },
  {
    id: 24,
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
    id: 25,
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
    id: 26,
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
    id: 27,
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
  
  // S09 Batch
  {
    id: 28,
    name: "AdThrow",
    batch: "S09",
    year: 2009,
    description: "Real-time ad targeting",
    reason: "Privacy laws killed their creepy tracking dreams - party poopers",
    category: "Advertising",
    founded: 2009,
    shutdownYear: 2012,
    funding: "$2.3M"
  },
  {
    id: 29,
    name: "CarWoo",
    batch: "S09",
    year: 2009,
    description: "Car buying platform",
    reason: "Car dealers preferred ripping people off the old-fashioned way",
    category: "Automotive",
    founded: 2009,
    shutdownYear: 2012,
    funding: "$4.5M"
  },
  {
    id: 30,
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
    id: 31,
    name: "Fanchatter",
    batch: "S09",
    year: 2009,
    description: "Fan content aggregation",
    reason: "Sports fans preferred yelling at their TVs over using their app",
    category: "Sports",
    founded: 2009,
    shutdownYear: 2011,
    funding: "$1.8M"
  },
  {
    id: 32,
    name: "Flightcaster",
    batch: "S09",
    year: 2009,
    description: "Flight delay prediction",
    reason: "Airlines started being more reliable - just kidding, people gave up caring",
    category: "Travel",
    founded: 2009,
    shutdownYear: 2011,
    funding: "$1.9M"
  },
  {
    id: 33,
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
    id: 34,
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
    id: 35,
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
  
  // W10 Batch
  {
    id: 37,
    name: "Answerly",
    batch: "W10",
    year: 2010,
    description: "Q&A entertainment platform",
    reason: "Quora existed and wasn't run by people who thought Twitter was a business model",
    category: "Social Media",
    founded: 2010,
    shutdownYear: 2012,
    funding: "$1.1M"
  },
  {
    id: 38,
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
  
  // S10 Batch
  {
    id: 39,
    name: "Brushes",
    batch: "S10",
    year: 2010,
    description: "iPad drawing software",
    reason: "Apple made better drawing apps and crushed them like digital paint",
    category: "Creative Software",
    founded: 2010,
    shutdownYear: 2012,
    funding: "$1.5M"
  },
  {
    id: 40,
    name: "Chirply",
    batch: "S10",
    year: 2010,
    description: "Crowdsourced design marketplace",
    reason: "Fiverr ate their lunch and charged less for terrible designs",
    category: "Design",
    founded: 2010,
    shutdownYear: 2012,
    funding: "$2.1M"
  },
  {
    id: 41,
    name: "Fanvibe",
    batch: "S10",
    year: 2010,
    description: "Social sports platform",
    reason: "Sports fans preferred Twitter arguments over organized discussions",
    category: "Sports",
    founded: 2010,
    shutdownYear: 2013,
    funding: "$3.2M"
  },
  {
    id: 42,
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
    id: 43,
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
    id: 44,
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
  
  // S11 Batch
  {
    id: 45,
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
    id: 46,
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
    id: 47,
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
    id: 48,
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
    id: 49,
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
    id: 50,
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
    id: 51,
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
    id: 52,
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
    id: 53,
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
  
  // W12 Batch
  {
    id: 54,
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
    id: 55,
    name: "Ark",
    batch: "W12",
    year: 2012,
    description: "Social information organization",
    reason: "People preferred their information disorganized and chaotic like their lives",
    category: "Productivity",
    founded: 2012,
    shutdownYear: 2014,
    funding: "$2.8M"
  },
  {
    id: 56,
    name: "BarSense",
    batch: "W12",
    year: 2012,
    description: "Kid's smartphone with parental controls",
    reason: "Parents realized giving kids smartphones was a terrible idea - too late for everyone else",
    category: "Consumer Hardware",
    founded: 2012,
    shutdownYear: 2014,
    funding: "$1.9M"
  },
  {
    id: 57,
    name: "BookSolid",
    batch: "W12",
    year: 2012,
    description: "Hotel booking platform",
    reason: "Booking.com and Expedia already existed and weren't complete garbage",
    category: "Travel",
    founded: 2012,
    shutdownYear: 2014,
    funding: "$3.1M"
  },
  
  // S12 Batch
  {
    id: 58,
    name: "Amicus",
    batch: "S12",
    year: 2012,
    description: "Nonprofit campaign management",
    reason: "Nonprofits preferred spending money on causes instead of software - weird priorities",
    category: "SaaS",
    founded: 2012,
    shutdownYear: 2015,
    funding: "$2.8M"
  },
  {
    id: 59,
    name: "Arc",
    batch: "S12",
    year: 2012,
    description: "Aerial videography",
    reason: "Drones got cheaper and people realized they didn't need professionals for shaky footage",
    category: "Hardware",
    founded: 2012,
    shutdownYear: 2014,
    funding: "$1.5M"
  },
  {
    id: 60,
    name: "Assorted Bits",
    batch: "S12",
    year: 2012,
    description: "Mobile calendar for social events",
    reason: "Apple Calendar worked fine and didn't require downloading another useless app",
    category: "Productivity",
    founded: 2012,
    shutdownYear: 2013,
    funding: "$1.2M"
  },
  {
    id: 61,
    name: "Binary Thumb",
    batch: "S12",
    year: 2012,
    description: "Mobile spreadsheet redesign",
    reason: "Excel on mobile was terrible but at least it wasn't trying to be 'innovative'",
    category: "Productivity",
    founded: 2012,
    shutdownYear: 2014,
    funding: "$2.1M"
  },
  {
    id: 62,
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
    id: 63,
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
    id: 64,
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
  
  // S13 Batch
  {
    id: 65,
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
    id: 66,
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
  
  // S15 Batch
  {
    id: 67,
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
  
  // S16 Batch
  {
    id: 68,
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
  
  // W18 Batch
  {
    id: 69,
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
  
  // S06 Batch (additional)
  {
    id: 70,
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
    id: 71,
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
    id: 72,
    name: "Kiko",
    batch: "S05",
    year: 2005,
    description: "Web-based calendar application",
    reason: "Google crushed them like a bug with Google Calendar - David vs Goliath went predictably",
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
