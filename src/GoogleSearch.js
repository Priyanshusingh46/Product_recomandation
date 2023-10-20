import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpeechSynthesis } from "react-speech-kit";
const GoogleSearch = () => {
  const [query, setQuery] = useState(''); // The search query
  const [results, setResults] = useState([]); // To store search results
  const [image,setImage] = useState('');
  const [details,setDetails] = useState("");
  const [value, setValue] = useState("")
  const { speak } = useSpeechSynthesis();

  const apiKey = 'AIzaSyDoV8eBI2irqMQ9alxmt3kLfhkmfj1gP6M';
  const cx = 'd7a417ec769ef4246';

  const performSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`
      );
     // console.log(response.data.items[0]);
      setImage(response.data.items[0].pagemap.cse_image[0].src)
      setResults(response.data.items[0]);
      setDetails(response.data.items[0].formattedUrl);
      const val = "The details of"+" "+ query +" "+"and for more details please visit given url" +" "+ details;
      setValue(val);
      console.log(value);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
        <h3>Write the Product Name</h3>
      <input
        style={{width:"15%",height:"30px"}}
        type="text"
        placeholder="Product Name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div style={{backgroundColor:"blue",width:"16%",height:"30px"}} onClick={performSearch}>
        <p style={{color:"white",textAlign:"center", fontSize:"23px"}}>Search</p>
      </div>

        {details &&(
      <div style={{display:"flex",marginTop:"10%", justifyContent:"space-evenly"}}> 
        <div style={{width:"48%"}}>
      <img style={{width:"100%"}} src={image} alt="error" />
      </div>

      <div style={{width:"48%"}}>
        <p>The details of {query} and for more deatils please visit given url {details}</p>
        <div  style={{backgroundColor:"blue",width:"30%", height:"4vh"}}>
            <p onClick={() => speak({ text: value })} style={{color:"white", fontSize:"23px",textAlign:"center"}}>Speech</p>
        </div>
      </div>

      </div>
        )}

    </div>
  );
};

export default GoogleSearch;
