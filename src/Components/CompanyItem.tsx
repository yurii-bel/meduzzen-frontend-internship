interface Company {
  id: number;
  name: string;
  industry: string;
  city: string;
  state: string;
}

interface CompanyItemProps {
  company: Company;
}

const CompanyItem: React.FC<CompanyItemProps> = ({ company }) => {
  return (
    <li key={company.id} className="mb-4">
      <h2 className="text-xl font-bold">{company.name}</h2>
      <p className="text-gray-600 mb-2">Industry: {company.industry}</p>
      <p className="text-gray-600">
        Location: {company.city}, {company.state}
      </p>
    </li>
  );
};

export default CompanyItem;
