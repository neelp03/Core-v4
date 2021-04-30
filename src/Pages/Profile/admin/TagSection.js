import React, {useState, useEffect} from 'react';
import { Badge, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label } from 'reactstrap';
import {addTag, deleteTag} from '../../../APIFunctions/User.js';
import {getAllTags} from '../../../APIFunctions/Tag';

export default function TagSection(props){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [tags, setTags] = useState([]);
    const [currentTagName, setTag] = useState('Choose tag');
    const [add, setAdd] = useState(false);
    const [buttonText, setButtonText] = useState('Add tag');

    const toggle = () => setDropdownOpen(!dropdownOpen)

    /* 
        Cannot call async function directly in useEffect
        For more, visit: 
        https://stackoverflow.com/questions/63570597/typeerror-func-apply-is-not-a-function
    */
    useEffect(() => {
        (async () => {
            const tagsData = await getAllTags()
            setTags(tagsData.responseData)
        })()
    }, []);
    
    useEffect(() =>{
        /*
            when user doesn't have the current tag name
            set add to true and set button text to add tag
        */
        let result = props.tags.filter(tag => tag.role === currentTagName)
        if(result.length==0) {
            setAdd(true)
            setButtonText('Add tag')
        } else {
            console.log("We are inside delete")
            setAdd(false)
            setButtonText('Delete tag')
        }

    }, [currentTagName])

    async function handleTagOperation(){
        if(currentTagName !== 'Choose tag' ){
            let apiResponse = null;
            alert("Before sending "+ props.email + " " + currentTagName)
            if(add)
            apiResponse = await addTag(props.email, currentTagName)
            else 
            apiResponse = await deleteTag(props.email, currentTagName)
            if(apiResponse.error){
            alert("Error adding/removing tag " + apiResponse.responseData)
            console.log(apiResponse)
            } 
            else {
            alert("Successfully add/remove tag")
            console.log(apiResponse)
            }
        }
    }

    return(
        <div>
            {/* inline styling color for user's access level
                as Badge doesn't support custom color
                https://reactstrap.github.io/components/badge/#
            */}
            {
                props.tags.map(tag => <Badge style={{backgroundColor: tag.color}}>{tag.role}</Badge>)
            }
            <Dropdown isOpen = {dropdownOpen} toggle = {toggle}>
                <DropdownToggle>
                    {currentTagName}
                </DropdownToggle>
                <DropdownMenu>
                    {
                        tags.map(tag => <DropdownItem onClick={()=>{setTag(tag.role)}}>{tag.role}</DropdownItem>)
                    }
                </DropdownMenu>
            </Dropdown>
            <button type="button" onClick={handleTagOperation} >{buttonText}</button>
        </div>
    )
}