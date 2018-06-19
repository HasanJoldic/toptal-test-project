import auth from "./auth";
import user from "./user";
import meal from "./meal";

const routes = [
    ...auth,
    ...user,
    ...meal
];

export default routes;
