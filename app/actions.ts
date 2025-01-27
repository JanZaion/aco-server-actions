'use server';

import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';

export async function savePickedWidget(widget: string) {
  try {
    const id = uuidv4();
    await sql`
      INSERT INTO picked (id, widget, date)
      VALUES (${id}, ${widget}, ${new Date().toISOString()})
    `;

    // or we can call api closer to db

    console.log('\x1b[36m%s\x1b[0m', '<--- we save data on the server, so we can see this in the node console --->');
    return { success: true, id };
  } catch (error) {
    console.error('Failed to save picked widget:', error);
    throw new Error('Failed to save your selection');
  }
}
