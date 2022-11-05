import type { LoaderArgs } from "@remix-run/node";
import { defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { sleep } from "~/utils";

const getPeopleDelayTime = 5000;
const getPeople = async () => {
  await sleep(getPeopleDelayTime);

  return [{ name: "adam" }, { name: "ben" }];
};

export async function loader({ request }: LoaderArgs) {
  const deferredPeoplePromise = getPeople();

  /**
   * @description
   * When we use `defer` we are telling the our server to send this HTML document in chunks.
   * The reason we are choosing to stream in this particular example is because we don't want to
   * for the `getPeople` API call to resolve (takes 5 seconds to load) before sending the  document, as
   * this results in bad user experience for the user.
   *
   * What if we could stream most of the HTML document immediately to the user and later stream in the people
   * data as starts to arrive so the user has something to see on the page?
   * Well, that's what we are going to do!
   *
   * Video demo explanation of concepts: https://youtu.be/95B8mnhzoCM?t=1250
   */
  return defer({
    people: deferredPeoplePromise,
  });
}

/**
 * @description
 * On this page we demonstrate using streaming SSR to render this HTML page.
 * Our API call to `getPeople` is slow (5s of simulated delay), however we would like
 * to render content to our users as fast as possible without waiting for `getPeople` to resolve completely.
 * With streaming SSR, we can send our HTML document in chunks so the user can see portions of the
 * page faster and then have the slower latency data be streamed in a bit later.
 *
 * This approoach differs from non-streaming in that, we are not waiting for all the data on the backend
 * to be resolved completely before the HTML page.
 */
export default function Page() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>
        Welcome to Remix{" "}
        <span style={{ fontSize: 20 }}>
          (This page was rendered via SSR streaming)
        </span>
      </h1>

      <Suspense
        fallback={
          <>
            <h2>People data loading...</h2>
          </>
        }
      >
        <Await resolve={data.people} errorElement={<div>Error</div>}>
          {(people) => (
            <>
              <h2>People</h2>
              <ul>
                {people.map((person, i) => (
                  <li key={i}>{person.name}</li>
                ))}
              </ul>
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
