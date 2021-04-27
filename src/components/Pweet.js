import { dbService } from 'fbase';
import React, { useState } from 'react';

const Pweet = ({ pweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);//true, false 바꾸기 위해.(edit 중인가 아닌가)
    const [newPweet, setNewPweet] = useState(pweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this pweet?");
        if(ok) {
            console.log(pweetObj.id);
            await dbService.doc('pweets/' + pweetObj.id).delete();
        }
    }
    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc('pweets/' + pweetObj.id).update({
            text: newPweet,
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const {target:{value},} = event;
        setNewPweet(value);
    }
    return (
        <div>
            {editing ? (
            <>
                <form onSubmit={onSubmit}>
                    <input 
                        type="text" 
                        placeholder="Edit your pweet" 
                        value={newPweet} 
                        required 
                        onChange={onChange}
                    />
                    <input type="submit"
                    value="Update Pweet" />
                </form>
                <button onClick={toggleEditing}>Cancel</button>
            </>
            ) : (
                <>
                <h4>{pweetObj.text}</h4>
                {pweetObj.attachmentUrl && 
                (<img src={pweetObj.attachmentUrl} width="50px" height="50px"/>
                )}
                {isOwner && (
                    <>
                        <button onClick={onDeleteClick}>Delete Pweet</button>
                        <button onClick={toggleEditing}>Edit Pweet</button>
                    </>
                )}
                </>
            )
            }
        </div>
    );
}

export default Pweet;