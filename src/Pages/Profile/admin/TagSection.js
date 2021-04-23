import React, {useState, useEffect} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {addTag, deleteTag} from '../../../APIFunctions/User.js';
import {getAllTags} from '../../../APIFunctions/Tag';

export default function TagSection(){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [tags, setTags] = useState(['haha','what']);

    const toggle = () => setDropdownOpen(!dropdownOpen)

    // useEffect(async () => {
    //     let tagsData = await getAllTags()
    //     let newTags = [...tags]
    //     for(let i = 0; i < tagsData.length; i ++){
    //         newTags.push(tagsData[i])
    //     }
    //     setTags(newTags)
    //     console.log(tags)
    // },[])

    function addTags(){
        let newTags = [...tags,'Test']
        setTags(newTags)
    }
    return(
        <div>
            <Dropdown isOpen = {dropdownOpen} toggle = {toggle}>
                <DropdownToggle>
                    Dropdown
                </DropdownToggle>
                <DropdownMenu>
                    {
                        tags.map(tag => <DropdownItem>{tag}</DropdownItem>)
                    }
                    <DropdownItem>Hi</DropdownItem>
                    <DropdownItem>Hi</DropdownItem>
                    <DropdownItem>Hi</DropdownItem>
                    <DropdownItem>Hi</DropdownItem>
                    <DropdownItem>Hi</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <button type="button" onClick={addTags}>Add new</button>
        </div>
    )
}