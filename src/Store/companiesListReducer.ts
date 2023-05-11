import { Company } from "../Types/types";

const initialState: Company[] = [];

const SET_COMPANIES = "SET_COMPANIES";

type SetCompaniesAction = {
  type: typeof SET_COMPANIES;
  payload: Company[];
};

export const setCompanies = (companies: Company[]): SetCompaniesAction => {
  return {
    type: SET_COMPANIES,
    payload: companies,
  };
};

export type CompaniesActions = SetCompaniesAction;

const companiesReducer = (
  state: Company[] = initialState,
  action: CompaniesActions
): Company[] => {
  switch (action.type) {
    case SET_COMPANIES:
      return action.payload;
    default:
      return state;
  }
};

export default companiesReducer;
