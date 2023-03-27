import { faker } from "@faker-js/faker";

function chooseRandomAmount(arr, maxPercentage = 1.0) {
  const num = faker.datatype.number({
    min: 0,
    max: Math.floor(arr.length * maxPercentage),
  });
  return faker.helpers.arrayElements(arr, num);
}

export { chooseRandomAmount };
