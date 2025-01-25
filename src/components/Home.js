
// Temporary Home Component for authenticated users
function Home({ user }) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-bold">Welcome, {user?.displayName || user?.email}!</h1>
          <p className="mt-2">You are successfully logged in.</p>
        </div>
      </div>
    );
  }

  export default Home