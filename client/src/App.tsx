import axios from "axios"


function App() {
  axios.get("http://localhost:8081/users").then((res) => {
    console.log(res.data)
  })

  return (
    <>
    </>
  )
}

export default App
