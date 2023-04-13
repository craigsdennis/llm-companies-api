/**
 Can you show me an example CDP profile in JSON format? Make sure to include fields that would help Fitlyfe to be successful. Include predictive traits like propensity to buy. Make sure to include lifetime value and customer acquisition.
{
  "user_id": "12345",
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "janedoe@example.com",
  "phone": "555-555-5555",
  "gender": "female",
  "age": 35,
  "location": {
    "city": "San Francisco",
    "state": "CA",
    "country": "USA"
  },
  "fitness_goals": [
    "lose_weight",
    "improve_endurance"
  ],
  "workout_history": [
    {
      "type": "cardio",
      "duration": 30,
      "intensity": "moderate"
    },
    {
      "type": "strength_training",
      "duration": 45,
      "intensity": "high"
    }
  ],
  "nutrition_history": {
    "calories": 1500,
    "protein": 100,
    "carbs": 150,
    "fat": 50
  },
  "wearable_data": {
    "steps": 8000,
    "calories_burned": 400,
    "heart_rate": 75
  },
  "engagement": {
    "last_login": "2021-11-01T09:00:00Z",
    "session_duration": 45,
    "feature_engagement": {
      "workout_plans": 10,
      "nutrition_guidance": 5,
      "community": 20
    }
  },
  "lifetime_value": 500,
  "customer_acquisition": {
    "source": "social_media",
    "campaign": "FitlyfeLaunch"
  },
  "propensity_to_buy": 0.7
}

This CDP profile includes a variety of fields that would help Fitlyfe to be successful, including:

User demographics (gender, age, location) to better understand its user base
Fitness goals and workout history to provide personalized workout plans
Nutrition history and wearable data to provide personalized nutrition guidance
Engagement data to identify areas for improvement and optimize user experience
Lifetime value and customer acquisition data to track business metrics
Propensity to buy to help identify users who may be interested in premium features or add
 */

// Wanted nutrition_history: {
//   calories: faker.datatype.number({ min: 1200, max: 2000 }),
//   protein: faker.datatype.number({ min: 50, max: 150 }),
//   carbs: faker.datatype.number({ min: 100, max: 250 }),
//   fat: faker.datatype.number({ min: 30, max: 80 }),
// },

////////

import { faker } from "@faker-js/faker";
import { chooseRandomAmount } from "../utils.js";

const fitnessGoals = [
  "lose_weight",
  "build_muscle",
  "improve_endurance",
  "tone_up",
  "increase_flexibility",
  "reduce_stress",
  "improve_balance",
  "enhance_sports_performance",
  "gain_strength",
  "boost_metabolism",
  "improve_sleep_quality",
  "reduce_inflammation",
  "manage_chronic_conditions",
];

const featureEngagementOptions = [
  "workout_plans",
  "nutrition_guidance",
  "community",
  "progress_tracking",
  "one-on-one_coaching",
  "challenges",
  "video_workouts",
  "wellness_articles",
  "meal_plans",
  "mindfulness_exercises",
  "exercise_library",
  "social_sharing",
];

const workoutTypes = [
  "cardio",
  "strength_training",
  "yoga",
  "pilates",
  "barre",
  "cycling",
  "running",
  "swimming",
  "weight_lifting",
  "boxing",
  "kickboxing",
  "dance",
  "calisthenics",
  "stretching",
  "mind-body_fusion",
];

const campaignOptions = [
  "FitlyfeLaunch",
  "NewYearNewYou",
  "SummerBodyChallenge",
  "FitForLife",
  "HealthyHolidays",
  "BackToSchoolFitness",
  "FitnessResolution",
  "GetActiveNow",
  "FitlyfeVIP",
  "FitlyfeReferral",
  "FitlyfeGiveaway",
  "FitlyfePartner",
];

function generateProfile(id) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const recentWorkoutTypes = chooseRandomAmount(workoutTypes, 0.4);
  const recentWorkouts = recentWorkoutTypes
    .map((type) => {
      return {
        type,
        duration: faker.datatype.number({ min: 10, max: 60 }),
        intensity: faker.helpers.arrayElement(["low", "moderate", "high"]),
        date: faker.date.recent(60),
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  const featureEngagement = featureEngagementOptions.reduce((prev, next) => {
    prev[next] = faker.datatype.number({ min: 0, max: 7 });
    return prev;
  }, {});
  const latestWorkout = recentWorkoutTypes.length;

  const userProfile = {
    id,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(firstName, lastName),
    phone: faker.phone.number("+1##########"),
    gender: faker.helpers.arrayElement([
      "male",
      "female",
      "non-binary",
      "prefer-not-to-specify",
    ]),
    age: faker.datatype.number({ min: 15, max: 70 }),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    fitness_goals: chooseRandomAmount(fitnessGoals, 0.3),
    recent_workout_count: recentWorkouts.length,
    latest_workout_type: latestWorkout.type,
    latest_workout_duration: latestWorkout.duration,
    latest_workout_intensity: latestWorkout.intensity,
    latest_workout_date: latestWorkout.date,
    wearable_steps: faker.datatype.number({ min: 100, max: 15000 }),
    wearable_calories_burned: faker.datatype.number({ min: 100, max: 1000 }),
    wearable_heart_rate: faker.datatype.number({ min: 60, max: 220 }),
    wearable_submitted: faker.date.recent(),
    last_login: faker.date.recent(100),
    session_duration: faker.datatype.number({ min: 10, max: 60 }),
    lifetime_value: faker.datatype.number({ min: 100, max: 1000 }),
    customer_acquisition_source: faker.helpers.arrayElement([
      "social_media",
      "email",
      "referral",
    ]),
    customer_acquisition_campaign: faker.helpers.arrayElement(campaignOptions),
    customer_acquisition_cost: faker.datatype.number({ min: 10, max: 200 }),
    propensity_to_buy: faker.datatype.number({
      min: 0,
      max: 1,
      precision: 0.01,
    }),
    emails_opened_last_30_days: faker.datatype.number({ min: 0, max: 10 }),
  };

  // Expose the features at a top level
  Object.keys(featureEngagement).forEach((feat) => {
    userProfile[`feature_engagement_${feat}`] = featureEngagement[feat];
  });

  return userProfile;
}

function generateProfiles(amount) {
  const profiles = [];
  for (let i = 0; i < amount; i++) {
    profiles.push(generateProfile(i + 1));
  }
  return profiles;
}

export default { generateProfiles };
