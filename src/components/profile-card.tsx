/*creating a profile card with name profession about and a signout button use tailwind css animations and hoover effects on card*/

export default function Home() {
    return (
  
      <div className="bg-gray-200 p-4 rounded-md shadow-md max-w-xs mx-auto mt-8 hover:shadow-lg transition duration-300 transform hover:scale-105">
        <div className="mb-4">
          <img
            className="w-20 h-20 rounded-full mx-auto"
            src="https://placekitten.com/100/100"
            alt="Profile"
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2 text-black">Ankit</h2>
          <p className="text-gray-600">AI Engineer</p>
          <p className="text-gray-700 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="mt-4 ">
          <button className="bg-lime-500 text-white px-4 py-2 rounded-md">
            Sign Out
          </button>
        </div>
      </div>
  
      
  
  
      
  
      
    
    )
  }
  