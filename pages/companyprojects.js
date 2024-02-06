// Import necessary modules and styles
import React from "react";
import clientPromise from "../lib/mongodb";
import ProtectedRoute from "../compoenets/protectedRoutes";

// CompanyProjects component
const CompanyProjects = ({ projects }) => {
  const projectdetails = projects?.[0].projects;

  return (
    <ProtectedRoute>
      <div className="container mx-10  my-10">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-teal-700">
          Company Projects
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-10">
          {projectdetails.map((project) => (
            <div key={project.id} className="bg-white rounded p-4 shadow-md">
              <img
                src={project.img}
                alt={project.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold mb-2">{project.name}</h2>
              <p className="text-gray-600 mb-4">{project.details}</p>

              <div className="flex items-center">
                <span className="text-gray-500 mr-2">Status:</span>
                <span
                  className={`${
                    project.status === "Completed"
                      ? "text-green-600"
                      : "text-red-600"
                  } font-bold`}
                >
                  {project.status}
                </span>
              </div>

              {/* Technologies section */}
              <span className="text-gray-500 mt-4 mr-2">Technologies:</span>
              <div className="flex items-center mt-2">
                <ul className="flex space-x-2">
                  {project.technologies.map((tech, index) => (
                    <li
                      key={index}
                      className="text-white bg-teal-500 rounded-md p-2 text-sm"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center mt-4">
                <span className="text-gray-500 mr-2">Start Date:</span>
                <span className="font-bold">{project.startDate}</span>
              </div>

              <div className="flex items-center mt-2">
                <span className="text-gray-500 mr-2">End Date:</span>
                <span className="font-bold">{project.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

// Fetch data from MongoDB on the server side
export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("projects");

    const product = await db.collection("details").find({}).toArray();

    return {
      props: { projects: JSON.parse(JSON.stringify(product)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { projects: [] },
    };
  }
}

// Export the component
export default CompanyProjects;
