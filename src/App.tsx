import { useState, useEffect } from "react";
import "./App.css";
import { HiMoon, HiCheck, HiSun } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import desktoplight from "./assets/images/bg-desktop-light.jpg";
import desktopdark from "./assets/images/bg-desktop-dark.jpg";

function App() {
  const [list, setlist] = useState(0);
  const [theme, settheme] = useState("");
  const [tracker, settracker] = useState(0);
  useEffect(() => {
    const prevtheme = localStorage.getItem("theme");
    if (prevtheme) {
      settheme(prevtheme);
      if (prevtheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);
  useEffect(() => {
    fetch("http://localhost:2065/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
      query {
        allNotesUser(email: "ishimwekevin45@gmail.com") {
          id
          email
          notes {
            id
            title
            content
            status
          }
        }
      }
    `,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setlist(data.data.allNotesUser);
      });
  }, [tracker]);
  const handleTheme = () => {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      settheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      settheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };
  const handleAddNote = async (e) => {
    console.log(e.target.value);
    await fetch("http://localhost:2065/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation createNotes {
            createNote(title: "${e.target.value}", content: "body", authorId: 1,status:"active") {
          id
        }
          }`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        e.target.value = "";
        settracker(() => tracker + 1);
      });
  };

  const handleDeletenote = async (id) => {
    await fetch("http://localhost:2065/graphql", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation deletenote {
            deleteNote (id:${id})
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        settracker(() => tracker + 1);
      });
  };
  // complete status update 

  const updateNote=async(id)=>{
    await fetch("http://localhost:2065/graphql", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation updatenotes {
            updateStatus(id:${id},status:"completed")
            }
        `,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        settracker(() => tracker + 1);
      });

  }

  return (
    <>
      <div className="dark:bg-[#161722] bg-[#e4e5f1] z-10 h-[100vh] w-[100vw]">
        <img
          src={theme == "light" ? desktoplight : desktopdark}
          className="fixed z-[2]  h-72 w-[100vw]"
          alt=""
        />
        <div className="w-[90vw] sm:w-[25em] absolute z-10  lg:w-[33em] left-[50%] transform -translate-x-1/2 flex flex-col">
          <div className="flex justify-between mt-32">
            <h1 className="text-4xl font-semibold text-white ">T O D O</h1>
            {theme === "light" ? (
              <HiMoon className="text-white text-4xl" onClick={handleTheme} />
            ) : (
              <HiSun className="text-white text-4xl" onClick={handleTheme} />
            )}
          </div>
          <input
            placeholder="new todo"
            className="bg-[#fafafa] shadow-xl dark:bg-[#25273c] mt-4 py-3 rounded-md text-xl focus:outline-none pl-4"
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                e.preventDefault();
                handleAddNote(e);
              }
            }}
          />
          <div className=" rounded-xl bg-[#fafafa] dark:bg-[#25273c] mt-4 min-h-[30vh] shadow-2xl pb-4">
            {list.notes === undefined ? (
              <h1>no notes yet</h1>
            ) : (
              list.notes.map(({ title, status, id }) => {
                return (
                  <div
                    key={id}
                    className=" flex justify-between py-1.5 border-b-[1.5px] font-semibold text-[large] dark:text-gray-400 text-[#100e18c4] mt-2 list-none  border-gray-200 "
                  >
                    <div className="flex">
                      {status === "completed" ? (
                        <p className="line-through">
                          <button className=" bg-gradient-to-r from-purple-500 to-pink-500 border-[1px] mx-4 border-gray-400 rounded-full h-5 w-5">
                            <HiCheck className="text-md mx-auto text-white" />
                          </button>
                          {title}
                        </p>
                      ) : (
                        <p>
                          <button className="border-[1px] mx-4 border-gray-400 rounded-full h-5 w-5" id={id} onClick={(e)=>{
                            updateNote(e.target.id);
                          }} />
                          {title}
                        </p>
                      )}
                    </div>

                    <RxCross1
                      className=" mr-4 hover:text-red-500"
                      id={id}
                      onClick={(e) => {
                        const id = Number(e.target.id);
                        console.log(id);
                        typeof id != String
                          ? handleDeletenote(id)
                          : console.log(typeof e.target.id);
                      }}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
