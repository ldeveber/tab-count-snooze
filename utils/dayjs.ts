import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  // Sunday = 0, Monday = 1.
  weekStart: 1,
});
