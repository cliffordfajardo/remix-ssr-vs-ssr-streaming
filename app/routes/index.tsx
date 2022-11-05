export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="ssr-route1-fast-one-api-call"
            rel="noreferrer"
          >
            ssr-route1-fast-one-api-call
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="/ssr-route2-fast-multiple-api-calls"
            rel="noreferrer"
          >
            ssr-route2-fast-multiple-api-calls
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="/ssr-route3-slow-one-api-call"
            rel="noreferrer"
          >
            ssr-route3-slow-one-api-call
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="/ssr-route4-slow-multiple-api-calls"
            rel="noreferrer"
          >
            ssr-route4-slow-multiple-api-calls
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="/streaming-ssr-route1-one-api-call"
            rel="noreferrer"
          >
            streaming-ssr-route1-one-api-call
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="/streaming-ssr-route2-multiple-api-calls"
            rel="noreferrer"
          >
            streaming-ssr-route2-multiple-api-calls
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="/streaming-ssr-route3-mix-critical-and-non-critical-data"
            rel="noreferrer"
          >
            streaming-ssr-route3-mix-critical-and-non-critical-data
          </a>
        </li>
      </ul>
    </div>
  );
}
