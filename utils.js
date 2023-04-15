import { faker } from "@faker-js/faker";
import { stripIndents } from "common-tags";

function generateApiDoc(company, profileFn) {
  const profile = profileFn(0);
  const keyDefinitions = [];
  const requiredKeys = ["id", "email"];
  Object.keys(profile).forEach((key) => {
    if (requiredKeys.includes(key)) return;
    // Determine the type
    const value = profile[key];
    let strType = typeof value;
    if (strType === "object") {
      if (Array.isArray(value)) {
        strType = "array";
      } else if (typeof value.getMonth === "function") {
        strType = "datetime";
      }
    }
    keyDefinitions.push(`${key} | ${strType} | optional`);
  });
  return stripIndents`
  Endpoint: https://llm-companies.cyclic.app/api/${company}
  GET /profiles

  This API is for searching user profiles

  Query parameters table:
  id | integer | Retrieves the unique identifier for a specific user. A valid vaule should be an integer between 1 and 1000 | optional
  email | string | The email address of a specific user. | optional
  _limit | integer | The maximum number of profiles per page. A valid value should be an integer between 1 and 10 (inclusive). default: 3 | optional

  Response schema (JSON object):
  id | integer | required
  email | string | required
  ${keyDefinitions.join("\n")}

  Use _limit: 1
  `;
}

export { generateApiDoc };

function chooseRandomAmount(arr, maxPercentage = 1.0) {
  const num = faker.datatype.number({
    min: 0,
    max: Math.floor(arr.length * maxPercentage),
  });
  return faker.helpers.arrayElements(arr, num);
}

export { chooseRandomAmount };
