import React from 'react';
import './App.scss';
import Landing from 'shared/Landing/Landing';

// function App() {
//   const [appTitle, setAppTitle] = useState('');

//   const callAPI = async () => {
//     const res = await fetch(`${process.env.REACT_APP_API_URL}/items?q=asd`);
//     const title = await res.text();
//     setAppTitle(title);
//   };

//   useEffect(() => {
//     callAPI();
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p className="App-intro">{appTitle}</p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
      <Landing />
    </div>
  );
}

export default App;
