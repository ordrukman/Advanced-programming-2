import React, {useEffect, useState} from "react";
import { FormControl , InputGroup, Button, OverlayTrigger, Popover, ButtonGroup, ButtonToolbar} from "react-bootstrap";
import AttachFiles from "./OverlayAttachment/AttachFiles";
import messages from "./messages";
import Helpers from "../Logic/helpers";

function InputBar(props){

    const [input, setInput] = useState("");

    function handleChange(event){
        let value = event.target.value
        setInput(value);
    }

    function sendMessage() {
        var now = new Date();
        let obj = {sender: true, text: input, time: now.getHours() + ':' + now.getMinutes()}
        for (let i=0; i < messages.length; i++) {
            let name = messages[i].name;
            if (name==props.contact) {
                messages[i].history.push(obj);
                props.setRefreshed((prev) => {return !prev})
                setInput("");
                break;
            }
        }
    }
//user={props.contact} setRefreshed={props.setRefreshed} setInput={setInput}
//props.contact, input, props.setRefreshed, setInput
    return (
        <InputGroup className="mb-3">
            <AttachFiles ></AttachFiles>
            <FormControl placeholder="New message here..." type="text" onChange={handleChange} value={input}/>
            <Button variant="primary" id="button-addon1" onClick={sendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" type="button" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
            </svg>
            </Button>
        </InputGroup>
    );
}

export default InputBar;