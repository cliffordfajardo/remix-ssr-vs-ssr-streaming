import type { LoaderArgs } from "@remix-run/node";
import { defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { sleep } from "~/utils";

const getProjectsDelay = 5000; // TODO example of where one takes 100ms (that will be the delay3)

const getPeople = async () => {
  await sleep(100); // simulate delay
  return [{ name: "adam" }, { name: "ben" }];
};

const getProjects = async () => {
  await sleep(getProjectsDelay);
  return [{ name: "Build Shed" }, { name: "Build Gaming Computer" }];
};
const getTasks = async () => {
  await sleep(getProjectsDelay);
  return [{ name: "Buy headphones" }, { name: "Take dog for walk" }];
};

export async function loader({ request }: LoaderArgs) {
  const people = await getPeople(); // critical data, the page will not stream until this resolves first.
  const deferredGetProjects = getProjects();
  const deferredGetTasks = getTasks();

  /**
   * @description
   * When we use `defer` we are telling the our server to send this HTML document in chunks.
   * Video demo explanation: https://youtu.be/95B8mnhzoCM?t=1250
   */
  return defer({
    people: people,
    projects: deferredGetProjects,
    tasks: deferredGetTasks,
  });
}

/**
 * This page demonstrates using the new deferred API for streaming data an HTML page.
 * I end up making 2 API calls on the backend to fetch data
 * 1. getPeople - which is a slow API call because its simulating an expensive API call. I will stream this data in since it takes long to complete
 * 2. getProjects - a fast API call,
 *
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
      <h2>People </h2>
      <ul>
        {data.people.map((people, i) => (
          <li key={i}>{people.name}</li>
        ))}
      </ul>
      <Suspense
        fallback={
          <>
            <h2>Projects data loading...</h2>
          </>
        }
      >
        <Await resolve={data.projects} errorElement={<div>Error</div>}>
          {(projects) => (
            <>
              <h2>People</h2>
              <ul>
                {projects.map((project, i) => (
                  <li key={i}>{project.name}</li>
                ))}
              </ul>
            </>
          )}
        </Await>
      </Suspense>
      <Suspense
        fallback={
          <>
            <h2>Tasks data loading...</h2>
          </>
        }
      >
        <Await resolve={data.tasks} errorElement={<div>Error</div>}>
          {(tasks) => (
            <>
              <h2>Tasks</h2>
              <ul>
                {tasks.map((task, i) => (
                  <li key={i}>{task.name}</li>
                ))}
              </ul>
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
