import { createClient } from "@/server";
import { useEffect, useState } from "react";

const client = createClient(location.origin);

function App() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    async function healthCheck() {
      const response = await client.sw.health.$get();
      const json = await response.json();

      const headers = Object.fromEntries(response.headers)

      const log = [
        `[${new Date(json.ts).toISOString()}]`,
        client.sw.health.$url().pathname,
        response.status.toString(),
        ...Object.entries(headers).map(([k, v]) => `${k}=${v}`)
      ].join(' ');

      setLogs((prev) => [...prev.slice(-10), log]);
    }

    const id = setInterval(healthCheck, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <ul className="w-full h-full mx-auto text-white p-4 md:p-6">
      {logs.map((log) => (
        <li key={log}>{log}</li>
      ))}
    </ul>
  );
}

export default App;
