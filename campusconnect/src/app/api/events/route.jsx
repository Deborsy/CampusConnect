import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req){
    try{
        const body = await req.json();
        const { name, description,date,location,category } = body;
        if (!name || !description || !date || !location || !category) {
            return new Response(JSON.stringify({error: "All Fields are required"}),{
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const docRef = await addDoc(collection(db, "events"), {
            name,
            description,
            date,
            location,
            category,
            createdAt: new Date(),
        });

        return new Response(JSON.stringify({message: "Event created successfully", id: docRef.id}),{
            status: 201,
            headers:{ "Content-Type": "application/json" },
        });
    }catch(error){
        return new Response(JSON.stringify({error: error.message},{
            status: 500,
            headers: { "Content-Type": "application/json" }
        }))
    }
}