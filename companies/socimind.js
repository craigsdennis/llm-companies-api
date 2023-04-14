import { faker } from "@faker-js/faker";
import { chooseRandomAmount, generateApiDoc } from "../utils.js";

const interests = [
  "Fashion",
  "Travel",
  "Food",
  "Fitness",
  "Music",
  "Technology",
  "Sports",
  "Art",
  "Photography",
  "Pets",
  "Environment",
  "Politics",
  "Business",
  "Entertainment",
  "Education",
  "Books",
  "Gaming",
  "Home decor",
  "Beauty",
  "DIY",
  "Parenting",
  "Relationships",
  "Health",
  "Spirituality",
  "Science",
  "History",
];

const contentTypes = ["Photo", "Video", "Status", "Article", "Event", "Group"];

const engagementTypes = ["Like", "Dislike", "Comment", "Share", "Report"];

const subscriptionTypes = [
  "Socimind Freemium",
  "Socimind Connect",
  "Socilife Premium",
];

function generateProfile(id) {
  const recentContentTypes = chooseRandomAmount(contentTypes, 0.6);
  const engagementHistory = recentContentTypes
    .map((contentType) => {
      return {
        content_type: contentType,
        content_id: faker.datatype.uuid(),
        content_date: faker.date.recent(150),
        engagement_type: faker.helpers.arrayElement(engagementTypes),
      };
    })
    .sort((a, b) => (a.content_date > b.content_date ? -1 : 1));
  const recentEngagementCountsByType = engagementTypes.reduce((prev, next) => {
    prev[next] = 0;
    return prev;
  }, {});
  engagementHistory.forEach((hist) => {
    recentEngagementCountsByType[hist.engagement_type] += 1;
  });
  const engagementTotals = engagementTypes.reduce((prev, next) => {
    prev[next + "s"] = faker.datatype.number({
      min: recentEngagementCountsByType[next],
      max: 100,
    });
    return prev;
  }, {});

  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const ltv = faker.datatype.number({ min: 0, max: 1000, precision: 2 });
  const accountCreationDate = faker.date.past(7);
  return {
    id,
    first_name: firstName,
    last_name: lastName,
    email: faker.internet.email(firstName, lastName),
    birthdate: faker.date.birthdate({ min: 13, max: 70, mode: "age" }),
    city: faker.address.city(),
    state: faker.address.state(),
    language: faker.helpers.arrayElement([
      "English",
      "Spanish",
      "French",
      "German",
      "Italian",
    ]),
    account_created_date: accountCreationDate,
    last_login_date: faker.date.recent(),
    total_sessions: faker.datatype.number({ min: 1, max: 10000, precision: 2 }),
    lifetime_value: ltv,
    customer_acquisition_cost: faker.datatype.number({
      min: 10,
      max: 100,
      precision: 2,
    }),
    subscription: {
      type: faker.helpers.arrayElement(subscriptionTypes),
      start_date: faker.date.future(1, accountCreationDate),
      end_date: faker.date.future(),
    },
    recent_engagement_history: engagementHistory,
    engagement_totals: engagementTotals,
    interests: chooseRandomAmount(interests, 0.3),
    propensity_to_buy: faker.datatype.number({
      min: 0,
      max: 1,
      precision: 0.01,
    }),
    predicted_lifetime_value: faker.datatype.number({ min: ltv, max: 2000 }),
    predicted_churn_probability: faker.datatype.number({
      min: 0,
      max: 1,
      precision: 0.01,
    }),
  };
}

function generateProfiles(amount) {
  const profiles = [];
  for (let i = 0; i < amount; i++) {
    profiles.push(generateProfile(i + 1));
  }
  return profiles;
}

export default {
  generateProfiles,
  generateDocs: () => generateApiDoc("shadazzle", generateProfile),
};
