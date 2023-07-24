// import React from 'react'

// function Home() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default Home

import React from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";


const Home = () => {
 
  return (
    <>
      <AddNote/>
      <Notes/>
    </>
  );
};

export default Home;
