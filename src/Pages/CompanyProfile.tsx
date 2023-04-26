import React from "react";

interface Company {
  id: number;
  name: string;
  industry: string;
  city: string;
  state: string;
  description: string;
  logoUrl: string;
}

const company: Company = {
  id: 1,
  name: "Acme Inc.",
  industry: "Manufacturing",
  city: "Los Angeles",
  state: "CA",
  description: "We make stuff",
  logoUrl: "https://via.placeholder.com/150",
};

const CompanyProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <img
        className="h-24 w-24 rounded-full object-cover"
        src={company.logoUrl}
        alt={company.name}
      />
      <h1 className="text-2xl font-bold my-4">{company.name}</h1>
      <h2 className="text-lg font-semibold">{company.industry}</h2>
      <p className="text-lg mt-2">
        Location: {company.city}, {company.state}
      </p>
      <p className="text-lg mt-2">{company.description}</p>
    </div>
  );
};

export default CompanyProfilePage;
