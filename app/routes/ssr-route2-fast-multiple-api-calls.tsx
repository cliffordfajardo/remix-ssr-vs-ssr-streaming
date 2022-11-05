import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { sleep } from "~/utils";

const getPeopleDelayTime = 300;
const getPeople = async () => {
  await sleep(getPeopleDelayTime);
  return [{ name: "adam" }, { name: "ben" }];
};
const getProjectsDelayTime = 300;
const getProjects = async () => {
  await sleep(getProjectsDelayTime);
  return [{ name: "Build Gaming Computer" }, { name: "Build outdoor shed" }];
};

export async function loader({ request }: LoaderArgs) {
  // Method1: making API calls serially (not optimal if we dont care about the order or results or if the API calls don't depend on each other)
  // Takes 600 milliseconds for both API calls to resolve when calling await serially.
  //   const people = await getPeople();
  //   const projects = await getProjects();
  //   return json({
  //     people: people,
  //     projects: projects,
  //   });

  // Method 2: immediately fire off both API calls. Promise.all will resolve once all promises inside the array resolve.
  // Takes 300 milliseconds for both API calls to resolve when we DONT call await serially.
  const [people, projects] = await Promise.all([getPeople(), getProjects()]);

  return json({
    people: people,
    projects: projects,
  });
}

/**
 * @description
 * This page demonstrates what happens when you wait for your data on the server to resolve
 * and then SSR the content. If you have API calls that are very fast (ex: 100-500ms)
 * than it may be fine to wait for your API call(s) to resolve so you can send back
 * a fully built HTML page.
 */
export default function Page() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>
        Welcome to Remix{" "}
        <span style={{ fontSize: 20 }}>
          (This page was rendered via SSR - no streaming)
        </span>
      </h1>

      <h2>People </h2>
      <ul>
        {data?.people.map((person, i) => (
          <li key={i}>{person.name}</li>
        ))}
      </ul>

      <h2>Projects </h2>
      <ul>
        {data?.projects.map((project, i) => (
          <li key={i}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}
