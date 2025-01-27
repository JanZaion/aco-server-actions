import { sql } from '@vercel/postgres';
import WidgetSelector from './components/WidgetSelector';

// This component runs on the server
// The sql query never makes it to the browser
export default async function Home() {
  try {
    console.log('\x1b[35m%s\x1b[0m', '<--- we load data on the server, so we can see this in the node console --->');

    const data = await sql<Widget>`
      SELECT widget, color
      FROM widgets`;

    // or call api closer to db

    // Serialize the data before passing to client component
    const widgets = data.rows.map((row) => ({
      widget: row.widget,
      color: row.color,
    }));

    return (
      <main className="min-h-screen">
        {/* This component runs in the browser */}
        <WidgetSelector widgets={widgets} />
      </main>
    );
  } catch (error) {
    throw error;
  }
}
