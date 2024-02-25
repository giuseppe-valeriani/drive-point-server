exports.seed = async function (knex) {
  await knex("pupils").del();
  await knex("pupils").insert([
    {
      id: 1,
      name: "alex bright",
      starting_date: "12/02/2024",
      intro_1: 3,
      intro_2: 3,
      intro_3: 3,
      turn_left_1: 2,
      turn_left_2: 1,
      turn_right_1: 0,
      turn_right_2: 0,
      hill_starts_1: 0,
      hill_starts_2: 0,
    },
    {
      id: 2,
      name: "carlo martello",
      starting_date: "16/02/2024",
      intro_1: 3,
      intro_2: 3,
      intro_3: 2,
      turn_left_1: 0,
      turn_left_2: 0,
      turn_right_1: 0,
      turn_right_2: 0,
      hill_starts_1: 0,
      hill_starts_2: 0,
    },
  ]);
};
