"use client"
import { useState, useEffect } from "react";

const CreateEvent =()=>{
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date: "",
        location: "",
        category: "",
    })

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        console.log("Form Data:", formData);

        const response = await fetch("/api/events", {
            method: "POST",
            headers: {"Context-Type": "application/json"},
            body: JSON.stringify(formData),
        });
        if (response.ok) alert("Event created Successfully");

        const data = await response.json();
        if (response.ok) {
            alert(`Event created succesfully! ID: ${data.id}`);
            setFormData({name: "", description: "", date: "", location: "", category: ""})
        }else{
            alert(`Error: ${data.error}`)
        }
    };
    return(
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <div className="flex justify-center items-center flex-col w-2/4 bg-white p-5 rounded-2xl shadow-xl">
                <h1 className="text-2xl text-green-800 font-bold">Tell Us About an Event</h1>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <input
                        type='text'
                        name='name'
                        placeholder='Event Name'
                        onChange={handleChange}
                        className="border p-2 w-full h-14 rounded-lg text-green-950"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                        className="border p-2 w-full h-28 rounded-lg text-green-950"
                    />
                    <input
                        type='datetime-local'
                        name='date'
                        onChange={handleChange}
                        className="border p-2 w-38 text-gray-500"
                    /> <br />
                    <input
                        type='text'
                        name='location'
                        placeholder="Location"
                        onChange={handleChange}
                        className="border p-2 w-full h-14 rounded-lg text-green-950"
                    />
                    <select 
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border p-2 w-full h-14 rounded-lg text-gray-500"
                        >
                            <option value="">Select a category</option>
                            <option value="academy">Academy</option>
                            <option value="sports">Sports</option>
                            <option value="cultural">Cultural</option>
                        </select> <br />
                        <button type="submit" className="bg-green-800 py-2.5 text-white px-8 rounded-lg">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default CreateEvent;