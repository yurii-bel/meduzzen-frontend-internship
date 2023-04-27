import { companies } from "../Data/companiesData";
import CompanyItem from "../Components/CompanyItem";

const CompaniesList: React.FC = () => {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 ml-10">Companies List</h1>
      <div className="p-4 flex justify-center">
        <ul>
          {companies.map((company) => (
            <CompanyItem key={company.id} company={company} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CompaniesList;