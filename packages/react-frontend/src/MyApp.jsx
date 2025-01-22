
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
	 const [characters, setCharacters] = useState([]);

	 function removeOneCharacter(id) {
		   fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" }).then((response) => { if (response.status === 204) {
		                 setCharacters(characters.filter((character) => character.id !== id));
		               } else {
			                 console.error("Failed to delete user: Resource not found");
			               }
	             })
	       .catch((error) => {
	               console.error("Error deleting user:", error);
	             });
	 }

	function updateList(person) {
		postUser(person)
		      .then((response) => {
		if (response.status === 201) {					                return response.json();
	        }
		else {								                throw new Error("Failed to add user");
			}
		})
		      .then((newUser) => setCharacters([...characters, newUser]))
		      .catch((error) => {
	              console.log(error);
			            });
	}

	function fetchUsers() {
		    const promise = fetch("http://localhost:8000/users");
		    return promise;
	}

	useEffect(() => {
		  fetchUsers()
			  .then((res) => res.json())
			  .then((json) => setCharacters(json["users_list"]))
			  .catch((error) => { console.log(error); });
	}, [] );
	
	function postUser(person) {
		    const promise = fetch("Http://localhost:8000/users", {
			          method: "POST",
			          headers: {
					          "Content-Type": "application/json",
					        },
			          body: JSON.stringify(person),
			        });

		    return promise;
		  }

return (
	  <div className="container">
	    <Table
	      characterData={characters}
	      removeCharacter={removeOneCharacter}
	    />
	<Form handleSubmit={updateList} />  
	</div>
);
	
}
export default MyApp;
