import { companies } from "../Data/companiesData";

interface Company {
  id: number;
  name: string;
  industry: string;
  city: string;
  state: string;
}

const CompaniesList: React.FC = () => {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 ml-10">Companies List</h1>
      <div className="p-4 flex justify-center">
        <ul>
          {companies.map((company) => (
            <li key={company.id} className="mb-4">
              <h2 className="text-xl font-bold">{company.name}</h2>
              <p className="text-gray-600 mb-2">Industry: {company.industry}</p>
              <p className="text-gray-600">
                Location: {company.city}, {company.state}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CompaniesList;
