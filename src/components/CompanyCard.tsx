import { Building2, Calendar, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeadCompany } from "@/types/DeadCompany";

interface CompanyCardProps {
  company: DeadCompany;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
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
  );
};