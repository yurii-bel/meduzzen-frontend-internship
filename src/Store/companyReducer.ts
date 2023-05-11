import { CompanyState } from "../Types/types";

const initialState: CompanyState = {
  company_id: 0,
  company_name: "",
  company_title: "",
  company_avatar: "string",
  is_visible: true,
  company_description: "string",
  company_city: "string",
  company_phone: "string",
  company_links: ["string"],
  company_owner: {
    user_id: 0,
    user_email: "string",
    user_firstname: "string",
    user_lastname: "string",
    user_avatar: "string",
  },
};

const SET_COMPANY = "SET_COMPANY";

type SetCompanyAction = {
  type: typeof SET_COMPANY;
  payload: CompanyState;
};

export const setCompany = (company: CompanyState): SetCompanyAction => {
  return {
    type: "SET_COMPANY",
    payload: company,
  };
};

export type CompanyActions = SetCompanyAction;

const companyReducer = (
  state: CompanyState = initialState,
  action: CompanyActions
): CompanyState => {
  switch (action.type) {
    case SET_COMPANY:
      return action.payload;
    default:
      return state;
  }
};

export default companyReducer;
