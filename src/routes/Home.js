import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({userObj}) => {
    const[pweet, setPweet] = useState("");
    const [pweets, setPweets] = useState([]);
    useEffect(() => {
        dbService.collection("pweets").onSnapshot(snapshot => {
            const pweetArray = snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
            setPweets(pweetArray);
        })
    }, []);
    const onSubmit =async (event) => {
        event.preventDefault();
        await dbService.collection("pweets").add({
            text:pweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
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
            <div>
                {pweets.map((pweet) => (
                    <div key={pweet.id}>
                        <h4>{pweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Home;