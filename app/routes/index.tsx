export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a target="_blank" href="ssr-route" rel="noreferrer">
            SSR Route (no streaming)
          </a>
        </li>
        <li>
          <a target="_blank" href="/streaming-ssr-route" rel="noreferrer">
            Streaming SSR Route
          </a>
        </li>
      </ul>
    </div>
  );
}
