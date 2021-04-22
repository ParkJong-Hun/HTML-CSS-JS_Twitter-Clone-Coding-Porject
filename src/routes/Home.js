import { dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {
    const[pweet, setPweet] = useState("");
    const onSubmit =async (event) => {
        event.preventDefault();
        await dbService.collection("pweets").add({
            pweet,
            createdAt: Date.now(),
        });
        setPweet("");
    }
    const onChange = (event) => {
        const {target:{value},} = event;
        setPweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value = {pweet} onChange ={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Pweet"/>
            </form>
        </div>
    );
}
export default Home;