import { companies } from "../Data/companiesData";
import Companies from "../Components/Companies";

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
          <Companies companies={companies} />
        </ul>
      </div>
    </section>
  );
};

export default CompaniesList;
