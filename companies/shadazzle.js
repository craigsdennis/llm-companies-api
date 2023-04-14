import { faker } from "@faker-js/faker";
import { generateApiDoc } from "../utils.js";

const companyName = "shadazzle";

const products = [
  "SunSync",
  "ChromaShades",
  "BeatShades",
  "HoloShades",
  "EcoShades",
  "ZoomShades",
  "MoodShades",
  "LightShades",
];

const promotions = [
  "Frame Your Style",
  "Lens Upgrade",
  "Beat the Heat",
  "Shadazzle VIP",
  "Share Your Style",
];

const events = [
  "NY Fashion Week",
  "Coachella",
  "CES",
  "Boston Marathon",
  "SXSW",
];

let idCounter = 1;

function generateProfile(id) {
  if (id === undefined) {
    id = idCounter++;
  }
  let purchases = [];
  const numPurchases = faker.datatype.number({
    min: 0,
    max: Math.floor(products.length / 2),
  });
  for (const product of faker.helpers.arrayElements(products, numPurchases)) {
    purchases.push({
      product_id: product,
      price: faker.datatype.float({ min: 100, max: 300 }),
      date: faker.date.recent(500),
    });
  }

  const minLTV = purchases.reduce((prev, next) => {
    return prev + next.price;
  }, 0);

  const numEvents = faker.datatype.number({
    min: 0,
    max: Math.floor(events.length / 2),
  });
  const attendEvents = faker.helpers.arrayElements(events, numEvents);

  const numPromotions = faker.datatype.number({
    min: 0,
    max: Math.floor(promotions.length / 2),
  });
  const promotionsUsed = faker.helpers.arrayElements(promotions, numPromotions);

  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const profile = {
    id,
    first_name: firstName,
    last_name: lastName,
    email: faker.internet.email(firstName, lastName).toLowerCase(),
    phone_number: faker.phone.number("+1##########"),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    total_products_purchased: numPurchases,
    most_recent_purchase: purchases[0] ? purchases[0].product_id : undefined,
    web_pages_viewed: faker.datatype.number({ min: 0, max: 20 }),
    web_time_spent: faker.datatype.number({ min: 0, max: 400 }),
    web_last_visit: faker.date.recent(),
    facebook_likes: faker.datatype.number({ min: 0, max: 10 }),
    facebook_comments: faker.datatype.number({ min: 0, max: 5 }),
    facebook_shares: faker.datatype.number({ min: 0, max: 5 }),
    instagram_likes: faker.datatype.number({ min: 0, max: 100 }),
    instagram_comments: faker.datatype.number({ min: 0, max: 10 }),
    instagram_shares: faker.datatype.number({ min: 0, max: 5 }),
    twitter_likes: faker.datatype.number({ min: 0, max: 10 }),
    twitter_comments: faker.datatype.number({ min: 0, max: 10 }),
    twitter_shares: faker.datatype.number({ min: 0, max: 5 }),
    cust_support_number_of_interactions: faker.datatype.number({
      min: 0,
      max: 10,
    }),
    cust_last_interaction: faker.date.recent(),
    csat: faker.datatype.float({ min: 0, max: 1, precision: 0.01 }),
    emails_opened_last_30_days: faker.datatype.number({ min: 0, max: 10 }),
    email_open_rate: faker.datatype.float({ min: 0, max: 1, precision: 0.01 }),
    email_click_through_rate: faker.datatype.number({ min: 0, max: 100 }),
    attended_events: attendEvents,
    promotions_used: promotionsUsed,
    propensity_to_buy: faker.datatype.float({
      min: 0,
      max: 1,
      precision: 0.01,
    }),
    lifetime_value: faker.datatype.float({ min: minLTV, max: minLTV + 600 }),
    customer_acquisition_cost: faker.datatype.float({ min: 10, max: 300 }),
  };
  return profile;
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

/**
{
  "user_id": "12345",
  "first_name": "Sarah",
  "last_name": "Smith",
  "email": "sarah.smith@email.com",
  "phone_number": "555-555-5555",
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zip_code": "12345"
  },
  "purchases": [
    {
      "product_id": "SunSync",
      "price": 199.99,
      "date": "2021-06-01"
    },
    {
      "product_id": "ChromaShades",
      "price": 249.99,
      "date": "2021-08-15"
    }
  ],
  "website_behavior": {
    "pages_viewed": 10,
    "time_spent": 20,
    "last_visit": "2021-10-01"
  },
  "social_media_engagement": {
    "facebook": {
      "likes": 50,
      "comments": 5,
      "shares": 2
    },
    "instagram": {
      "likes": 100,
      "comments": 10,
      "shares": 3
    },
    "twitter": {
      "likes": 20,
      "comments": 2,
      "shares": 1
    }
  },
  "customer_service_interactions": {
    "number_of_interactions": 2,
    "last_interaction": "2021-09-01"
  },
  "email_marketing": {
    "open_rate": 30,
    "click_through_rate": 10,
    "last_email": "2021-09-15"
  },
  "events_and_promotions": {
    "attended_events": ["Fashion Week", "Summer Music Festival"],
    "promotions_used": ["Summer Sale"]
  },
  "propensity_to_buy": 0.75,
  "lifetime_value": 500.00,
  "customer_acquisition_cost": 100.00
} 

 */
