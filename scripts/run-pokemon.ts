import 'dotenv/config';

import { db } from '../lib/db';

import { runPokemon } from './pokemon.runner';

runPokemon()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    db.end();
  });
