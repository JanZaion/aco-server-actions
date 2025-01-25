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

    console.log('<--- we save data on the server, so we can see this in the node console --->');
    return { success: true, id };
  } catch (error) {
    console.error('Failed to save picked widget:', error);
    throw new Error('Failed to save your selection');
  }
}
