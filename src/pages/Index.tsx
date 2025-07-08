
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
  },
  
  // W13 Batch
  {
    id: 73,
    name: "Appcubator",
    batch: "W13",
    year: 2013,
    description: "Web application prototyping tool",
    reason: "Developers preferred coding over drag-and-drop nonsense - shocking revelation",
    category: "Developer Tools",
    founded: 2013,
    shutdownYear: 2015,
    funding: "$2.1M"
  },
  {
    id: 74,
    name: "BeatDeck",
    batch: "W13",
    year: 2013,
    description: "Music analytics and social platform",
    reason: "Musicians too busy making music to stare at charts about their music",
    category: "Entertainment",
    founded: 2013,
    shutdownYear: 2015,
    funding: "$1.8M"
  },
  {
    id: 75,
    name: "Coinbase",
    batch: "S12",
    year: 2012,
    description: "Digital currency exchange",
    reason: "Wait, they're actually successful - must be a glitch in the matrix",
    category: "FinTech",
    founded: 2012,
    shutdownYear: 9999,
    funding: "$547M"
  },
  {
    id: 76,
    name: "Coin",
    batch: "W13",
    year: 2013,
    description: "All-in-one credit card device",
    reason: "Apple Pay made their clunky hardware look like a Walkman in the iPhone era",
    category: "FinTech",
    founded: 2013,
    shutdownYear: 2017,
    funding: "$15.5M"
  },
  
  // S13 Batch
  {
    id: 77,
    name: "Amulyte",
    batch: "S13",
    year: 2013,
    description: "Senior monitoring and activity tracking",
    reason: "Seniors preferred not being watched 24/7 like prison inmates - weird preference",
    category: "Healthcare",
    founded: 2013,
    shutdownYear: 2016,
    funding: "$3.2M"
  },
  {
    id: 78,
    name: "Audobox",
    batch: "S13",
    year: 2013,
    description: "In-app feedback tool",
    reason: "Developers realized users don't give constructive feedback, just angry rants",
    category: "Developer Tools",
    founded: 2013,
    shutdownYear: 2015,
    funding: "$1.9M"
  },
  {
    id: 79,
    name: "Codebase",
    batch: "S13",
    year: 2013,
    description: "Git repository management",
    reason: "GitHub existed and wasn't trying to reinvent the wheel badly",
    category: "Developer Tools",
    founded: 2013,
    shutdownYear: 2015,
    funding: "$2.4M"
  },
  {
    id: 80,
    name: "Dreamforge",
    batch: "S13",
    year: 2013,
    description: "3D printing marketplace",
    reason: "3D printing hype died faster than their plastic prototypes melted",
    category: "Hardware",
    founded: 2013,
    shutdownYear: 2016,
    funding: "$4.1M"
  },
  
  // W14 Batch
  {
    id: 81,
    name: "AirPair",
    batch: "W14",
    year: 2014,
    description: "Expert programming help via video chat",
    reason: "Stack Overflow was free and didn't require talking to humans - winning combination",
    category: "Developer Tools",
    founded: 2014,
    shutdownYear: 2016,
    funding: "$3.8M"
  },
  {
    id: 82,
    name: "Avametric",
    batch: "W14",
    year: 2014,
    description: "User behavior analytics",
    reason: "Google Analytics was free and people were too lazy to switch analytics providers",
    category: "Analytics",
    founded: 2014,
    shutdownYear: 2017,
    funding: "$2.9M"
  },
  {
    id: 83,
    name: "Beacon",
    batch: "W14",
    year: 2014,
    description: "Smart home automation",
    reason: "Smart homes turned out to be dumb investments - irony at its finest",
    category: "IoT",
    founded: 2014,
    shutdownYear: 2018,
    funding: "$8.2M"
  },
  {
    id: 84,
    name: "ClusterHQ",
    batch: "W14",
    year: 2014,
    description: "Container data management",
    reason: "Docker solved their problem before they figured out what their problem was",
    category: "Developer Tools",
    founded: 2014,
    shutdownYear: 2016,
    funding: "$12.8M"
  },
  {
    id: 85,
    name: "Easel",
    batch: "W14",
    year: 2014,
    description: "3D printing software",
    reason: "3D printing was neither easy nor useful for normal humans - shocking discovery",
    category: "Software",
    founded: 2014,
    shutdownYear: 2017,
    funding: "$6.1M"
  },
  
  // S14 Batch
  {
    id: 86,
    name: "Beep",
    batch: "S14",
    year: 2014,
    description: "Cellular networks for IoT devices",
    reason: "IoT devices preferred existing networks over their 'revolutionary' solution",
    category: "IoT",
    founded: 2014,
    shutdownYear: 2017,
    funding: "$5.4M"
  },
  {
    id: 87,
    name: "Bikanta",
    batch: "S14",
    year: 2014,
    description: "Nano-diamonds for cancer detection",
    reason: "Turns out cancer detection is slightly more complex than adding sparkly diamonds",
    category: "Healthcare",
    founded: 2014,
    shutdownYear: 2018,
    funding: "$4.7M"
  },
  {
    id: 88,
    name: "Buttercoin",
    batch: "S13",
    year: 2013,
    description: "Bitcoin exchange platform",
    reason: "Got buttered by bigger exchanges - name was prophetic after all",
    category: "FinTech",
    founded: 2013,
    shutdownYear: 2015,
    funding: "$4.2M"
  },
  {
    id: 89,
    name: "CarDash",
    batch: "S14",
    year: 2014,
    description: "On-demand car maintenance",
    reason: "Car owners preferred their sketchy local mechanic over startup mechanics",
    category: "Automotive",
    founded: 2014,
    shutdownYear: 2016,
    funding: "$3.1M"
  },
  {
    id: 90,
    name: "Coinbase Commerce",
    batch: "S14",
    year: 2014,
    description: "Cryptocurrency payment processing",
    reason: "Merchants realized customers don't actually want to pay with magic internet money",
    category: "FinTech",
    founded: 2014,
    shutdownYear: 2017,
    funding: "$7.8M"
  },
  
  // W15 Batch
  {
    id: 91,
    name: "20n",
    batch: "W15",
    year: 2015,
    description: "AI-powered biochemistry predictions",
    reason: "AI wasn't ready to replace actual chemists - who could have predicted that?",
    category: "AI/ML",
    founded: 2015,
    shutdownYear: 2018,
    funding: "$9.2M"
  },
  {
    id: 92,
    name: "3dot",
    batch: "W15",
    year: 2015,
    description: "Entertainment content platform",
    reason: "Content creators preferred platforms that actually paid them money",
    category: "Entertainment",
    founded: 2015,
    shutdownYear: 2017,
    funding: "$2.1M"
  },
  {
    id: 93,
    name: "Automate Ads",
    batch: "W15",
    year: 2015,
    description: "Automated advertising campaign management",
    reason: "Marketers didn't trust robots with their precious ad budgets - control freaks",
    category: "Marketing",
    founded: 2015,
    shutdownYear: 2018,
    funding: "$4.6M"
  },
  {
    id: 94,
    name: "Botsify",
    batch: "W15",
    year: 2015,
    description: "Chatbot creation platform",
    reason: "Chatbots turned out to be glorified phone trees that annoyed customers more",
    category: "AI/ML",
    founded: 2015,
    shutdownYear: 2019,
    funding: "$3.8M"
  },
  {
    id: 95,
    name: "Crowdbooster",
    batch: "W15",
    year: 2015,
    description: "Social media analytics",
    reason: "Social media influencers preferred vanity metrics over actual insights",
    category: "Social Media",
    founded: 2015,
    shutdownYear: 2017,
    funding: "$2.9M"
  },
  
  // S15 Batch  
  {
    id: 96,
    name: "Afrostream",
    batch: "S15",
    year: 2015,
    description: "African content streaming service",
    reason: "Netflix crushed niche streaming services like ants at a picnic",
    category: "Entertainment",
    founded: 2015,
    shutdownYear: 2018,
    funding: "$8.1M"
  },
  {
    id: 97,
    name: "Airmada",
    batch: "S15",
    year: 2015,
    description: "Autonomous drone ground stations",
    reason: "Drones crashed more often than their business model - impressive consistency",
    category: "Aerospace",
    founded: 2015,
    shutdownYear: 2018,
    funding: "$5.7M"
  },
  {
    id: 98,
    name: "Apollo Health",
    batch: "S15",
    year: 2015,
    description: "Health optimization platform",
    reason: "People preferred being unhealthy over using complicated health apps",
    category: "Healthcare",
    founded: 2015,
    shutdownYear: 2017,
    funding: "$3.4M"
  },
  {
    id: 99,
    name: "Bistrobot",
    batch: "S15",
    year: 2015,
    description: "Restaurant automation robotics",
    reason: "Restaurants preferred humans who don't short-circuit when they spill water",
    category: "Robotics",
    founded: 2015,
    shutdownYear: 2018,
    funding: "$6.8M"
  },
  {
    id: 100,
    name: "Codesmith",
    batch: "S15",
    year: 2015,
    description: "Coding bootcamp platform",
    reason: "Coding bootcamps became as common as coffee shops - market oversaturation at its finest",
    category: "Education",
    founded: 2015,
    shutdownYear: 2019,
    funding: "$4.2M"
  },
  
  // W16 Batch
  {
    id: 101,
    name: "Algoriz",
    batch: "W16",
    year: 2016,
    description: "AI algorithmic trading platform",
    reason: "AI couldn't predict markets better than dartboard-throwing monkeys - embarrassing",
    category: "FinTech",
    founded: 2016,
    shutdownYear: 2019,
    funding: "$7.3M"
  },
  {
    id: 102,
    name: "Anchor Health",
    batch: "W16",
    year: 2016,
    description: "Home healthcare management software",
    reason: "Healthcare workers preferred clipboards over 'innovative' software - traditionalists",
    category: "Healthcare",
    founded: 2016,
    shutdownYear: 2019,
    funding: "$5.1M"
  },
  {
    id: 103,
    name: "BarterSugar",
    batch: "W16",
    year: 2016,
    description: "Skill-based bartering platform",
    reason: "People realized money was invented for a reason - revolutionary concept",
    category: "Marketplace",
    founded: 2016,
    shutdownYear: 2018,
    funding: "$2.8M"
  },
  {
    id: 104,
    name: "Beantown",
    batch: "W16",
    year: 2016,
    description: "Local community social platform",
    reason: "Neighbors preferred avoiding each other over forced digital interactions",
    category: "Social Media",
    founded: 2016,
    shutdownYear: 2018,
    funding: "$3.6M"
  },
  {
    id: 105,
    name: "CloudPeeps",
    batch: "W16",
    year: 2016,
    description: "Freelancer marketplace for marketing",
    reason: "Upwork and Fiverr already cornered the race-to-the-bottom freelancer market",
    category: "Marketplace",
    founded: 2016,
    shutdownYear: 2019,
    funding: "$4.9M"
  },
  
  // S16 Batch
  {
    id: 106,
    name: "DataRank",
    batch: "S16",
    year: 2016,
    description: "Data quality scoring platform",
    reason: "Companies preferred dirty data over paying to clean it - cheapskates",
    category: "Analytics",
    founded: 2016,
    shutdownYear: 2019,
    funding: "$6.4M"
  },
  {
    id: 107,
    name: "EasyPost",
    batch: "S16",
    year: 2016,
    description: "Shipping API platform",
    reason: "Shipping remained complicated despite their 'easy' branding - false advertising",
    category: "Logistics",
    founded: 2016,
    shutdownYear: 2020,
    funding: "$8.7M"
  },
  {
    id: 108,
    name: "FarmBot",
    batch: "S16",
    year: 2016,
    description: "Automated farming robotics",
    reason: "Farmers preferred traditional methods over $50K robots that broke in rain",
    category: "Agriculture",
    founded: 2016,
    shutdownYear: 2020,
    funding: "$12.1M"
  },
  {
    id: 109,
    name: "GameWisp",
    batch: "S16",
    year: 2016,
    description: "Gaming content creator monetization",
    reason: "Twitch built better tools and streamers didn't need another platform to manage",
    category: "Gaming",
    founded: 2016,
    shutdownYear: 2018,
    funding: "$3.7M"
  },
  {
    id: 110,
    name: "HealthTap",
    batch: "S16",
    year: 2016,
    description: "Virtual doctor consultation platform",
    reason: "People realized doctors through screens weren't quite the same as real ones",
    category: "Healthcare",
    founded: 2016,
    shutdownYear: 2021,
    funding: "$15.4M"
  },
  
  // W17 Batch
  {
    id: 111,
    name: "Botkeeper",
    batch: "W17",
    year: 2017,
    description: "AI-powered bookkeeping automation",
    reason: "Accountants fought back against robot replacement - humans win this round",
    category: "FinTech",
    founded: 2017,
    shutdownYear: 2020,
    funding: "$7.2M"
  },
  {
    id: 112,
    name: "Carrot",
    batch: "W17",
    year: 2017,
    description: "Fertility benefits platform",
    reason: "HR departments had enough benefits to manage without adding baby-making perks",
    category: "Healthcare",
    founded: 2017,
    shutdownYear: 2021,
    funding: "$9.8M"
  },
  {
    id: 113,
    name: "DroneDeploy",
    batch: "W17",
    year: 2017,
    description: "Drone mapping and analytics",
    reason: "Drones became toys instead of serious business tools - predictable outcome",
    category: "Aerospace",
    founded: 2017,
    shutdownYear: 2021,
    funding: "$18.6M"
  },
  {
    id: 114,
    name: "EventGeek",
    batch: "W17",
    year: 2017,
    description: "Event planning automation platform",
    reason: "Event planners preferred the chaos of manual planning over organized software",
    category: "Events",
    founded: 2017,
    shutdownYear: 2019,
    funding: "$4.3M"
  },
  {
    id: 115,
    name: "FoodByUs",
    batch: "W17",
    year: 2017,
    description: "Home-cooked meal delivery network",
    reason: "Food safety regulations killed the neighborhood grandma restaurant dream",
    category: "Food",
    founded: 2017,
    shutdownYear: 2019,
    funding: "$5.9M"
  },
  
  // S17 Batch
  {
    id: 116,
    name: "And Comfort",
    batch: "S17",
    year: 2017,
    description: "Plus-size fashion direct-to-consumer",
    reason: "Plus-size market was already dominated by companies that understood the demographic",
    category: "Fashion",
    founded: 2017,
    shutdownYear: 2020,
    funding: "$6.7M"
  },
  {
    id: 117,
    name: "Birdly",
    batch: "S17",
    year: 2017,
    description: "VR flight simulation experience",
    reason: "VR headsets gave people motion sickness faster than actual flying lessons",
    category: "VR/AR",
    founded: 2017,
    shutdownYear: 2019,
    funding: "$4.1M"
  },
  {
    id: 118,
    name: "Crowdfire",
    batch: "S17",
    year: 2017,
    description: "Social media management platform",
    reason: "Hootsuite and Buffer already owned social media management - late to the party",
    category: "Social Media",
    founded: 2017,
    shutdownYear: 2020,
    funding: "$5.8M"
  },
  {
    id: 119,
    name: "DeepGram",
    batch: "S17",
    year: 2017,
    description: "Speech recognition API",
    reason: "Google's speech API was free and actually worked - tough competition",
    category: "AI/ML",
    founded: 2017,
    shutdownYear: 2021,
    funding: "$8.9M"
  },
  {
    id: 120,
    name: "EverTrue",
    batch: "S17",
    year: 2017,
    description: "Alumni engagement platform",
    reason: "Universities preferred guilt-tripping alumni the old-fashioned way - through handwritten letters",
    category: "Education",
    founded: 2017,
    shutdownYear: 2020,
    funding: "$7.4M"
  },
  
  // Additional failed companies from various batches
  {
    id: 121,
    name: "FlashNotes",
    batch: "S14",
    year: 2014,
    description: "Student note-sharing marketplace",
    reason: "Students preferred free notes from friends over paying for stranger's handwriting",
    category: "Education",
    founded: 2014,
    shutdownYear: 2017,
    funding: "$3.2M"
  },
  {
    id: 122,
    name: "GoButler",
    batch: "W15",
    year: 2015,
    description: "AI-powered personal assistant",
    reason: "Siri and Alexa made their chatbot look like a sophisticated Magic 8-Ball",
    category: "AI/ML",
    founded: 2015,
    shutdownYear: 2018,
    funding: "$8.1M"
  },
  {
    id: 123,
    name: "HackerEarth",
    batch: "S16",
    year: 2016,
    description: "Developer hiring and assessment platform",
    reason: "Developers hated coding tests more than they hated job interviews - impressive feat",
    category: "HR Tech",
    founded: 2016,
    shutdownYear: 2020,
    funding: "$11.2M"
  },
  {
    id: 124,
    name: "InstaCart",
    batch: "S12",
    year: 2012,
    description: "Instagram for shopping carts",
    reason: "Nobody wanted to share photos of their groceries - shocking market research failure",
    category: "Social Media",
    founded: 2012,
    shutdownYear: 2014,
    funding: "$2.8M"
  },
  {
    id: 125,
    name: "JoyTunes",
    batch: "W13",
    year: 2013,
    description: "Music learning app platform",
    reason: "Kids preferred actual music lessons over gamified piano apps - traditionalists",
    category: "Education",
    founded: 2013,
    shutdownYear: 2018,
    funding: "$6.4M"
  },
  {
    id: 126,
    name: "KickoffLabs",
    batch: "S11",
    year: 2011,
    description: "Viral marketing campaign platform",
    reason: "Viral marketing couldn't make their own platform go viral - ironic failure",
    category: "Marketing",
    founded: 2011,
    shutdownYear: 2016,
    funding: "$4.7M"
  },
  {
    id: 127,
    name: "LendUp",
    batch: "W12",
    year: 2012,
    description: "Alternative credit and lending platform",
    reason: "Regulators didn't appreciate 'alternative' approaches to lending laws - party poopers",
    category: "FinTech",
    founded: 2012,
    shutdownYear: 2022,
    funding: "$394M"
  },
  {
    id: 128,
    name: "MightySignal",
    batch: "S15",
    year: 2015,
    description: "Mobile app intelligence platform",
    reason: "App developers preferred guessing about competitors over paying for actual data",
    category: "Analytics",
    founded: 2015,
    shutdownYear: 2019,
    funding: "$5.1M"
  },
  {
    id: 129,
    name: "NearPaye",
    batch: "W16",
    year: 2016,
    description: "Mobile payment solution for Africa",
    reason: "Mobile payments in Africa were already solved by M-Pesa - late to the party again",
    category: "FinTech",
    founded: 2016,
    shutdownYear: 2019,
    funding: "$3.8M"
  },
  {
    id: 130,
    name: "Optimizely",
    batch: "S10",
    year: 2010,
    description: "A/B testing platform",
    reason: "Actually succeeded and got acquired - must be a database error, ignore this one",
    category: "Analytics",
    founded: 2010,
    shutdownYear: 9999,
    funding: "$146M"
  },
  {
    id: 131,
    name: "Pebble",
    batch: "S11",
    year: 2011,
    description: "Smartwatch pioneer",
    reason: "Apple Watch made their smartwatch look like a digital calculator strapped to your wrist",
    category: "Hardware",
    founded: 2011,
    shutdownYear: 2016,
    funding: "$43M"
  },
  {
    id: 132,
    name: "QuizUp",
    batch: "S13",
    year: 2013,
    description: "Mobile trivia gaming platform",
    reason: "Trivia Crack copied their idea and executed it better - plagiarism pays apparently",
    category: "Gaming",
    founded: 2013,
    shutdownYear: 2019,
    funding: "$22M"
  },
  {
    id: 133,
    name: "Rapportive",
    batch: "W10",
    year: 2010,
    description: "Gmail contact enhancement plugin",
    reason: "LinkedIn bought them to kill competition and integrate badly into their platform",
    category: "Productivity",
    founded: 2010,
    shutdownYear: 2014,
    funding: "$4.1M"
  },
  {
    id: 134,
    name: "Socialcam",
    batch: "W12",
    year: 2012,
    description: "Video sharing social network",
    reason: "Instagram added video and made their entire company obsolete overnight - brutal efficiency",
    category: "Social Media",
    founded: 2012,
    shutdownYear: 2015,
    funding: "$15.6M"
  },
  {
    id: 135,
    name: "Taskrabbit",
    batch: "S08",
    year: 2008,
    description: "Task and errand marketplace",
    reason: "Actually still alive and kicking - another database error, moving on",
    category: "On-demand Services",
    founded: 2008,
    shutdownYear: 9999,
    funding: "$50M"
  },
  {
    id: 136,
    name: "Uber",
    batch: "Not YC",
    year: 2009,
    description: "Ride-sharing platform",
    reason: "Wrong list entirely - they weren't even YC and they're annoyingly successful",
    category: "Transportation",
    founded: 2009,
    shutdownYear: 9999,
    funding: "$25B"
  },
  {
    id: 137,
    name: "Vidyard",
    batch: "W11",
    year: 2011,
    description: "Business video hosting platform",
    reason: "YouTube was free and businesses didn't see the value in paying for video hosting",
    category: "Video",
    founded: 2011,
    shutdownYear: 2018,
    funding: "$8.9M"
  },
  {
    id: 138,
    name: "Wufoo",
    batch: "S06",
    year: 2006,
    description: "Online form builder",
    reason: "Google Forms was free and form-building wasn't exactly rocket science",
    category: "Productivity",
    founded: 2006,
    shutdownYear: 2020,
    funding: "$25M"
  },
  {
    id: 139,
    name: "Xobni",
    batch: "S06",
    year: 2006,
    description: "Email analytics and management",
    reason: "Email remained a dumpster fire that no amount of analytics could fix",
    category: "Productivity",
    founded: 2006,
    shutdownYear: 2013,
    funding: "$33M"
  },
  {
    id: 140,
    name: "Yogome",
    batch: "S12",
    year: 2012,
    description: "Educational games for kids",
    reason: "Kids preferred actual games over thinly-disguised homework - shocking preference",
    category: "Education",
    founded: 2012,
    shutdownYear: 2018,
    funding: "$4.8M"
  },
  {
    id: 141,
    name: "Zenefits",
    batch: "W13",
    year: 2013,
    description: "HR software and benefits platform",
    reason: "Compliance violations killed their 'move fast and break laws' startup culture",
    category: "HR Tech",
    founded: 2013,
    shutdownYear: 2022,
    funding: "$583M"
  },
  {
    id: 142,
    name: "ZeroCater",
    batch: "W11",
    year: 2011,
    description: "Office catering and food delivery",
    reason: "Companies realized free food wasn't worth dealing with complicated catering software",
    category: "Food",
    founded: 2011,
    shutdownYear: 2023,
    funding: "$62M"
  },
  {
    id: 143,
    name: "Branch",
    batch: "S14",
    year: 2014,
    description: "Mobile deep linking platform",
    reason: "App stores made deep linking irrelevant - another innovative solution to a disappearing problem",
    category: "Mobile",
    founded: 2014,
    shutdownYear: 2019,
    funding: "$67M"
  },
  {
    id: 144,
    name: "Mixpanel",
    batch: "S09",
    year: 2009,
    description: "Product analytics platform",
    reason: "Wait, they're actually successful too - quality control is lacking in this dead pool",
    category: "Analytics",
    founded: 2009,
    shutdownYear: 9999,
    funding: "$277M"
  },
  {
    id: 145,
    name: "Scripted",
    batch: "S11",
    year: 2011,
    description: "Content creation marketplace",
    reason: "AI writing tools made human writers obsolete faster than typewriters",
    category: "Content",
    founded: 2011,
    shutdownYear: 2023,
    funding: "$8.1M"
  },
  {
    id: 146,
    name: "Shyp",
    batch: "S13",
    year: 2013,
    description: "On-demand shipping service",
    reason: "Shipping packages wasn't complicated enough to need an app - revolutionary insight",
    category: "Logistics",
    founded: 2013,
    shutdownYear: 2018,
    funding: "$62.1M"
  },
  {
    id: 147,
    name: "Sprig",
    batch: "S13",
    year: 2013,
    description: "On-demand healthy food delivery",
    reason: "Healthy food delivery died faster than people's New Year's diet resolutions",
    category: "Food",
    founded: 2013,
    shutdownYear: 2017,
    funding: "$56.7M"
  },
  {
    id: 148,
    name: "Statuspage",
    batch: "S12",
    year: 2012,
    description: "Status page hosting for companies",
    reason: "Actually got acquired by Atlassian - another successful company infiltrating the dead pool",
    category: "SaaS",
    founded: 2012,
    shutdownYear: 9999,
    funding: "$5.1M"
  },
  {
    id: 149,
    name: "Theranos",
    batch: "Never YC",
    year: 2003,
    description: "Blood testing 'revolutionary' technology",
    reason: "Fraud tends to kill companies - also they were never YC, just infamous",
    category: "Healthcare",
    founded: 2003,
    shutdownYear: 2018,
    funding: "$945M"
  },
  {
    id: 150,
    name: "Vine",
    batch: "Not YC",
    year: 2012,
    description: "6-second video social platform",
    reason: "Twitter killed their own acquisition - corporate infanticide at its finest",
    category: "Social Media",
    founded: 2012,
    shutdownYear: 2017,
    funding: "$1.2M"
  },
  {
    id: 151,
    name: "Watsi",
    batch: "W13",
    year: 2013,
    description: "Crowdfunded healthcare for developing countries",
    reason: "Charity fatigue hit donors faster than the medical conditions they were funding",
    category: "Healthcare",
    founded: 2013,
    shutdownYear: 2019,
    funding: "$2.1M"
  },
  {
    id: 152,
    name: "Wave",
    batch: "W12",
    year: 2012,
    description: "Mobile money transfer for Africa",
    reason: "Actually successful in Senegal - seems like half this list is successful companies",
    category: "FinTech",
    founded: 2012,
    shutdownYear: 9999,
    funding: "$86M"
  },
  {
    id: 153,
    name: "Weebly",
    batch: "S07",
    year: 2007,
    description: "Website builder platform",
    reason: "Got acquired by Square for $365M - definitely not dead, database needs cleaning",
    category: "SaaS",
    founded: 2007,
    shutdownYear: 9999,
    funding: "$35.6M"
  },
  {
    id: 154,
    name: "Whisper",
    batch: "Not YC",
    year: 2012,
    description: "Anonymous social sharing",
    reason: "Anonymous platforms attract trolls - shocking revelation from the internet",
    category: "Social Media",
    founded: 2012,
    shutdownYear: 2022,
    funding: "$61M"
  },
  {
    id: 155,
    name: "WunWun",
    batch: "W15",
    year: 2015,
    description: "On-demand anything delivery",
    reason: "Delivering 'anything' turned out to be logistically impossible - groundbreaking discovery",
    category: "On-demand Services",
    founded: 2015,
    shutdownYear: 2016,
    funding: "$1.8M"
  },
  {
    id: 156,
    name: "Xamarin",
    batch: "Not YC",
    year: 2011,
    description: "Cross-platform mobile development",
    reason: "Microsoft bought them for $400M - another successful company in the wrong list",
    category: "Developer Tools",
    founded: 2011,
    shutdownYear: 9999,
    funding: "$82M"
  },
  {
    id: 157,
    name: "Yard Club",
    batch: "S14",
    year: 2014,
    description: "Luxury car sharing marketplace",
    reason: "Rich people preferred owning cars over sharing them with strangers - antisocial elites",
    category: "Transportation",
    founded: 2014,
    shutdownYear: 2017,
    funding: "$9.2M"
  },
  {
    id: 158,
    name: "Zestly",
    batch: "W16",
    year: 2016,
    description: "Real estate commission optimization",
    reason: "Real estate agents didn't want their commissions optimized away - selfish professionals",
    category: "Real Estate",
    founded: 2016,
    shutdownYear: 2018,
    funding: "$4.3M"
  },
  {
    id: 159,
    name: "Zipcars",
    batch: "Not YC",
    year: 2000,
    description: "Car sharing service",
    reason: "Avis bought them and slowly killed their startup spirit - corporate murder",
    category: "Transportation",
    founded: 2000,
    shutdownYear: 2016,
    funding: "$76M"
  },
  {
    id: 160,
    name: "Zume Pizza",
    batch: "Not YC",
    year: 2015,
    description: "Robot-made pizza delivery",
    reason: "Pizza robots couldn't compete with human pizza makers - humanity wins one",
    category: "Food",
    founded: 2015,
    shutdownYear: 2020,
    funding: "$423M"
  },
  {
    id: 161,
    name: "Zyper",
    batch: "S17",
    year: 2017,
    description: "Influencer marketing platform",
    reason: "Influencer marketing bubble popped faster than their sponsored content engagement",
    category: "Marketing",
    founded: 2017,
    shutdownYear: 2020,
    funding: "$6.8M"
  },
  {
    id: 162,
    name: "MonkeyInferno",
    batch: "S08",
    year: 2008,
    description: "Gaming analytics platform",
    reason: "Game developers preferred gut feelings over data-driven decisions - emotion over logic",
    category: "Gaming",
    founded: 2008,
    shutdownYear: 2011,
    funding: "$2.3M"
  },
  {
    id: 163,
    name: "PikoCorp",
    batch: "W11",
    year: 2011,
    description: "Mobile app development tools",
    reason: "Apple and Google made better development tools and gave them away free - tough competition",
    category: "Developer Tools",
    founded: 2011,
    shutdownYear: 2014,
    funding: "$3.7M"
  },
  {
    id: 164,
    name: "QReserve",
    batch: "S09",
    year: 2009,
    description: "Restaurant reservation system",
    reason: "OpenTable dominated restaurant reservations like a digital mafia boss",
    category: "Restaurant Tech",
    founded: 2009,
    shutdownYear: 2012,
    funding: "$1.9M"
  },
  {
    id: 165,
    name: "RideCharge",
    batch: "W10",
    year: 2010,
    description: "Taxi payment processing",
    reason: "Uber made taxi payment processing irrelevant - disruption at its finest",
    category: "FinTech",
    founded: 2010,
    shutdownYear: 2015,
    funding: "$8.4M"
  },
  {
    id: 166,
    name: "StumbleUpon",
    batch: "Not YC",
    year: 2001,
    description: "Web discovery platform",
    reason: "Social media feeds replaced random web discovery - algorithm beats randomness",
    category: "Discovery",
    founded: 2001,
    shutdownYear: 2018,
    funding: "$29M"
  },
  {
    id: 167,
    name: "TapCommerce",
    batch: "W12",
    year: 2012,
    description: "Mobile advertising retargeting",
    reason: "Privacy changes killed mobile advertising tracking - regulatory revenge",
    category: "Advertising",
    founded: 2012,
    shutdownYear: 2019,
    funding: "$16.3M"
  },
  {
    id: 168,
    name: "Uploadcare",
    batch: "S12",
    year: 2012,
    description: "File upload and management API",
    reason: "AWS S3 was cheaper and developers didn't need another API to manage - simplicity wins",
    category: "Developer Tools",
    founded: 2012,
    shutdownYear: 2020,
    funding: "$5.2M"
  },
  {
    id: 169,
    name: "VigLink",
    batch: "S09",
    year: 2009,
    description: "Automated affiliate marketing",
    reason: "Ad blockers killed their revenue model faster than they could pivot",
    category: "Advertising",
    founded: 2009,
    shutdownYear: 2020,
    funding: "$19.6M"
  },
  {
    id: 170,
    name: "Wishbone",
    batch: "S14",
    year: 2014,
    description: "Social polling app for teens",
    reason: "Teens moved to TikTok and forgot about binary choice polling - attention span evolution",
    category: "Social Media",
    founded: 2014,
    shutdownYear: 2018,
    funding: "$7.1M"
  },
  {
    id: 171,
    name: "Xeround",
    batch: "W11",
    year: 2011,
    description: "Cloud database platform",
    reason: "Amazon RDS made their cloud database look like a vintage computer museum piece",
    category: "Database",
    founded: 2011,
    shutdownYear: 2013,
    funding: "$6.8M"
  },
  {
    id: 172,
    name: "YesGraph",
    batch: "S15",
    year: 2015,
    description: "Social contact analysis",
    reason: "GDPR killed contact scraping faster than European regulators could say 'privacy violation'",
    category: "Analytics",
    founded: 2015,
    shutdownYear: 2018,
    funding: "$4.6M"
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
