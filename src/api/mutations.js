import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";

const CreateUser = async (email, locale) => {
  const {
    data: { createUser },
  } = await API.graphql(
    graphqlOperation(mutations.createUser, { input: { email, locale } })
  );
  return createUser;
};

const UpdateUser = async ({ id, email, locale, name, birthdate }) => {
  const {
    data: { updateUser },
  } = await API.graphql(
    graphqlOperation(mutations.updateUser, {
      input: {
        id,
        email,
        locale,
        ...(name && { name }),
        ...(birthdate && { birthdate }),
      },
    })
  );
  return updateUser;
};

const Mutations = {
  CreateUser,
  UpdateUser,
};

export default Mutations;
