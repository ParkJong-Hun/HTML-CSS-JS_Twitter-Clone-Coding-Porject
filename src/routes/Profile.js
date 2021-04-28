import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

export default ({ userObj }) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
    const getMyPweets = async() => {
        const pweets = await dbService
        .collection("pweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createAt")
        .get();
        console.log(pweets.docs.map((doc) => doc.data()));
    }
    useEffect(() => {
        getMyPweets();
    }, [])
return <>
    <button onClick = {onLogOutClick}>Log Out</button>
    </>;
}