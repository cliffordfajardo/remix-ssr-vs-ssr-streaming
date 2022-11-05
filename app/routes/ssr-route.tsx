import { json, LoaderArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { sleep } from "~/utils";

const getPeopleStreamingDelay = 5000;
const getProjectsDelay = 100;

const getPeople = async () => {
  await sleep(getPeopleStreamingDelay);
  return [{ name: "adam" }, { name: "ben" }];
};

const getProjects = async () => {
  await sleep(getProjectsDelay);
  return [{ name: "Build Shed" }, { name: "Build Gaming Computer" }];
};

export async function loader({ request }: LoaderArgs) {
  const people = await getPeople();
  const projects = await getProjects();
  return json({
    people: people,
    projects: projects,
  });
}

/**
 * This page demonstrates using the new deferred API for data loading.
 * I end up making 2 API calls on the backend to fetch data
 * 1. getPeople - which is a slow API call because its simulating an expensive API call
 * 2. getProjects - a fast API call.
 *
 */
export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>
        Welcome to Remix{" "}
        <span style={{ fontSize: 20 }}>
          (This page was rendered via SSR with no streaming)
        </span>
      </h1>
      <h2>Projects</h2>
      <ul>
        {data.projects.map((project, i) => {
          return <li key={i}>{project.name}</li>;
        })}
      </ul>

      <h2>People</h2>
      <ul>
        {data.people.map((person, i) => (
          <li key={i}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}
